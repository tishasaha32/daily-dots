import { db } from "@/app/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { create } from "zustand";

interface JournalState {
  journals: Journal[];
  loading: boolean;
  error: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getJournals: ({ user }: { user: any }) => void;
  addJournal: ({
    values,
    mood,
    user,
    setCreating,
    setOpenAddJournalDrawer,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: any;
    mood: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
    setCreating: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenAddJournalDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void;
  updateJournal: ({
    setUpdate,
    journal,
    mood,
    values,
    setOpenEditJournal,
  }: {
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    journal: Journal;
    mood: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: any;
    setOpenEditJournal: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void;
  deleteJournal: ({
    journalId,
    setOpenDialog,
    setDeleteJournalState,
  }: {
    journalId: string;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteJournalState: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void;
}

export const useJournalStore = create<JournalState>((set) => ({
  journals: [],
  loading: false,
  error: null,

  getJournals: async ({ user }) => {
    set({ loading: true, error: null });
    try {
      const journalsCollection = collection(db, "journals");
      // Query to filter journals by user ID
      const q = query(journalsCollection, where("userUid", "==", user?.uid));
      const journalsSnapshot = await getDocs(q);

      const journalsList: Journal[] = journalsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          uuid: data?.uuid || "",
          title: data?.title || "",
          description: data?.description || "",
          category: data?.category as
            | "Personal"
            | "Work"
            | "Family"
            | "Health"
            | "Events",
          date: data?.date ? new Date(data?.date.toDate()) : new Date(),
          mood: data?.mood as
            | "😀"
            | "😍"
            | "😎"
            | "😭"
            | "😱"
            | "😡"
            | "😖"
            | "🤧",
          imageUrl: data?.imageUrl || "",
        };
      });
      set({ journals: journalsList, loading: false, error: null });
      return journalsList as Journal[];
    } catch (error) {
      console.error("Error fetching journals:", error);
      set({ loading: false, error: error as string });
      return [] as Journal[];
    }
  },

  addJournal: async ({
    values,
    mood,
    user,
    setCreating,
    setOpenAddJournalDrawer,
  }) => {
    setCreating(true);
    let imageUrl = "";

    if (values?.imageUrl && values?.imageUrl.length > 0) {
      try {
        const data = new FormData();
        data.append("file", values.imageUrl[0]);
        data.append("upload_preset", "daily-dots");
        data.append("cloud_name", "dlatzxjdp");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dlatzxjdp/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (!res.ok) {
          throw new Error(`Cloudinary upload failed: ${res.statusText}`);
        }

        const uploadImage = await res.json();
        if (uploadImage?.url) {
          imageUrl = uploadImage.url;
        }
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    }

    try {
      // Convert date to IST before storing
      const gmtDate = values?.date ? new Date(values.date) : new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
      const istDate = new Date(gmtDate.getTime() + istOffset);

      // Store journal to Firestore
      const payload = {
        ...values,
        date: istDate, // Save date in IST
        mood,
        imageUrl,
        userUid: user,
      };
      const docRef = await addDoc(collection(db, "journals"), payload);
      if (docRef.id) {
        set((state) => ({
          journals: [...state.journals, { id: docRef.id, ...payload }],
        }));
      }
    } catch (error) {
      console.error("Error saving journal to Firestore:", error);
    }

    setCreating(false);
    setOpenAddJournalDrawer(false);
  },

  updateJournal: async ({
    setUpdate,
    journal,
    mood,
    values,
    setOpenEditJournal,
  }) => {
    setUpdate(true);

    if (!journal?.id) {
      console.error("Journal ID is undefined");
      setUpdate(false);
      return;
    }

    const journalRef = doc(db, "journals", journal.id);
    let uploadImage = journal.imageUrl || ""; // Default to existing image URL

    if (values?.imageUrl && values?.imageUrl.length > 0) {
      // Store file to Cloudinary
      const data = new FormData();
      data.append("file", values.imageUrl[0]);
      data.append("upload_preset", "daily-dots");
      data.append("cloud_name", "dlatzxjdp");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dlatzxjdp/image/upload",
          { method: "POST", body: data }
        );

        if (!res.ok) {
          throw new Error(`Cloudinary upload failed: ${res.statusText}`);
        }

        const response = await res.json();
        uploadImage = response?.url || uploadImage; // Use new image if available
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    }

    try {
      // Convert date to IST before updating
      const gmtDate = values?.date ? new Date(values.date) : new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
      const istDate = new Date(gmtDate.getTime() + istOffset);

      // Update journal in Firestore
      const updatedJournal = {
        ...values,
        date: istDate, // Store date in IST
        mood,
        imageUrl: uploadImage,
      };
      await updateDoc(journalRef, updatedJournal);

      // Update state
      set((state) => ({
        journals: state.journals.map((t) =>
          t.id === journal.id ? { ...t, ...updatedJournal } : t
        ),
      }));
    } catch (error) {
      console.error("Error updating journal in Firestore:", error);
    }

    setUpdate(false);
    setOpenEditJournal(false);
  },

  deleteJournal: async ({
    journalId,
    setOpenDialog,
    setDeleteJournalState,
  }) => {
    setDeleteJournalState(true);
    try {
      await deleteDoc(doc(db, "journals", journalId));
      set((state) => ({
        ...state,
        journals: state.journals.filter((t) => t.id !== journalId),
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setOpenDialog(false);
    setDeleteJournalState(false);
  },
}));

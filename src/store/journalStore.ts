import { db } from "@/app/firebase/config";
import {
  addDoc,
  collection,
  //   deleteDoc,
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
  getJournals: ({ user }: { user: any }) => void;
  addJournal: ({
    values,
    mood,
    user,
    setCreating,
    setOpenAddJournalDrawer,
  }: {
    values: any;
    mood: string;
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
    values: any;
    setOpenEditJournal: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void;
  //   deleteJournal: (journal: Journal) => void;
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
          date: data?.dueDate ? new Date(data?.dueDate.toDate()) : new Date(),
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
    if (values?.imageUrl && values?.imageUrl?.length > 0) {
      //Store file to cloudinary
      const data = new FormData();
      data.append("file", values?.imageUrl[0]);
      data.append("upload_preset", "journal_buddy");
      data.append("cloud_name", "dlatzxjdp");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlatzxjdp/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const uploadImage = await res.json();

      //Store journal to firestore
      const payload = {
        ...values,
        mood,
        imageUrl: uploadImage.url,
        userUid: user,
      };
      const docRef = await addDoc(collection(db, "journals"), payload);
      if (docRef.id) {
        set((state) => ({
          journals: [...state.journals, { id: docRef.id, ...payload }],
        }));
      } else {
      }
    } else {
      //Store journal to firestore
      const payload = { ...values, mood, imageUrl: "", userUid: user };
      const docRef = await addDoc(collection(db, "journals"), payload);
      if (docRef.id) {
        set((state) => ({
          journals: [...state.journals, { id: docRef.id, ...payload }],
        }));
      } else {
      }
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

    if (values?.imageUrl && values?.imageUrl.length > 0) {
      // Store file to Cloudinary
      const data = new FormData();
      data.append("file", values.imageUrl[0]);
      data.append("upload_preset", "journal_buddy");
      data.append("cloud_name", "dlatzxjdp");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlatzxjdp/image/upload",
        { method: "POST", body: data }
      );
      const uploadImage = await res.json();

      // Update journal in Firestore
      const updatedJournal = { ...values, mood, imageUrl: uploadImage.url };
      await updateDoc(journalRef, updatedJournal);
    } else {
      const updatedJournal = {
        ...values,
        mood: mood,
        imageUrl: journal.imageUrl || "",
      };
      await updateDoc(journalRef, updatedJournal);
    }

    // Update state
    set((state) => ({
      journals: state.journals.map((t) =>
        t.id === journal.id ? { ...t, ...values } : t
      ),
    }));

    setUpdate(false);
    setOpenEditJournal(false);
  },

  //   deleteJournal: async (journal: Journal) => {},
}));

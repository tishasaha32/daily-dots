type Journal = {
  id?: string;
  uuid: string;
  title: string;
  description: string;
  date: Date;
  category: "Personal" | "Work" | "Family" | "Health" | "Events";
  mood: "😀" | "😍" | "😎" | "😭" | "😱" | "😡" | "😖" | "🤧";
  imageUrl: string;
};

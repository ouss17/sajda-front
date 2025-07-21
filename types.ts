export interface Category {
  id: number;
  name: string;
  comment: string;
  url_name: string;
}

export type Content = {
  id: number;
  title: string;
  content?: string;
  media?: string | null;
  [key: string]: any;
};

export interface CreateFeedbackProps {
  setIsFeedback: (v: boolean) => void;
}
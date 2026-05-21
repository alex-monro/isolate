export type StemType = "vocals" | "drums" | "bass" | "other";

export interface StemJob {
  id: string;
  status: "idle" | "processing" | "done" | "error";
  stems: StemType[];
  fileName: string;
}

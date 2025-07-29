export const BlockTypes = {
  TEXT: "text",
  IMAGE: "image",
  CTA: "cta"
};

export const DefaultBlockData = {
  [BlockTypes.TEXT]: { text: "" },
  [BlockTypes.IMAGE]: { url: "", alt: "" },
  [BlockTypes.CTA]: { label: "زر", link: "#" }
};
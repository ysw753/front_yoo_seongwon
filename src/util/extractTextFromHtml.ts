export default function extractTextFromHTML(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  console.log(doc);
  return doc.body.textContent || "";
}

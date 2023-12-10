export function getFileExtension(filename: string) {
  return filename.slice((((filename.lastIndexOf(".") - 1) >>> 0) + 2) >>> 0);
}

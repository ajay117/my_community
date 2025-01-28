export const hashPassword = async (password: string): Promise<string> => {
  const data = new TextEncoder().encode(password); // Convert password to bytes
  const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Hash the password
  return Array.from(new Uint8Array(hashBuffer)) // Convert hash to hex string
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

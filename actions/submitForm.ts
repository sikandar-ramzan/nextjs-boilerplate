"use server";

export async function handleFormSubmission(formData: FormData) {
  // Extract values from the formData object
  const name = formData.get("name");
  const email = formData.get("email");

  // Perform server-side logic, e.g., saving data, making API calls
  console.log("Received form data: ", { name, email });

  // You can perform any asynchronous operation here
  // For now, just return a response
  return {
    success: true,
    message: `Form submitted successfully with Name: ${name} and Email: ${email}`,
  };
}

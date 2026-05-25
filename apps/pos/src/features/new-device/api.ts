export async function validatePairingCode(pin: string) {
  await new Promise((r) => setTimeout(r, 800))
  if (pin === "123456") {
    return {
      success: true as const,
      outletName: "KL Branch",
      outletId: "out_456",
    }
  }
  return { success: false as const }
}

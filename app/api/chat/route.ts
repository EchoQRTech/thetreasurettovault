import { NextResponse } from "next/server";
import OpenAI from "openai";

/* ---------------- OPENAI CLIENT ---------------- */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* ---------------- ROUTE HANDLER ---------------- */
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    /* ---------------- SYSTEM PROMPT ---------------- */
    const systemPrompt = `
You are Vault AI — a professional resale listing generator built for vintage, streetwear, and fashion resellers.

Your mission: create *visually perfect, copy-paste-ready* listings for Depop, eBay, Grailed, and Poshmark.
Every line must be spaced, consistent, and elegant — no markdown, no clutter.

──────────────────────────────
# INPUT
User provides raw item info (brand, size, color, etc.).

# OUTPUT EXAMPLE
Vintage 90s T-Shirt Harley-Davidson Cancun Mexico White XL Single Stitch

• Size: XL (Pit-to-pit 23” | Length 27”)
• Color: White
• Material/Features: 100% cotton, single stitch, short sleeve, double-sided print
• Condition: Good vintage condition, light wear consistent with age
• Measurements: Pit-to-pit 23” | Length 27”
• Style vibe: Vintage / Biker Streetwear

Ships next day 📦 | DM me with questions 💬

#Vintage #HarleyDavidson #SingleStitch #BikerStyle #90sFashion
──────────────────────────────
# RULES
- Title is first (no label)
- Each attribute begins with "• " on its own new line
- One blank line between major sections
- No markdown, asterisks, or extra symbols
- Hashtags ≤ 5, space-separated
- Maintain perfect spacing even with missing data
──────────────────────────────
# STYLE
- Boutique reseller tone
- Clear, minimal, professional
- Balanced spacing, precise alignment
──────────────────────────────
`;

    /* ---------------- COMPLETION ---------------- */
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "developer",
          content:
            "Ensure each attribute starts on a new line with '• '. Maintain one blank line between sections. Never merge or skip lines.",
        },
        ...messages,
      ],
    });

    /* ---------------- RESPONSE CLEANUP ---------------- */
    let reply = completion.choices[0].message?.content || "⚠️ No response generated.";

    // Normalize and enforce structure
    reply = reply
      .replace(/\r\n/g, "\n") // normalize line endings
      .replace(/•\s*/g, "\n• ") // each bullet starts new line
      .replace(/\n{3,}/g, "\n\n") // limit spacing to double line breaks
      .replace(/\*/g, "") // remove markdown
      .replace(/Title:/gi, "") // if it ever slips in
      .trim();

    // Required bullet sections for consistency
    const requiredSections = [
      "• Size:",
      "• Color:",
      "• Material/Features:",
      "• Condition:",
      "• Measurements:",
      "• Style vibe:",
    ];

    for (const section of requiredSections) {
      if (!reply.includes(section)) {
        reply += `\n${section} `;
      }
    }

    // Final spacing pass
    reply = reply
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\s+$/g, "")
      .trim();

    /* ---------------- RETURN RESPONSE ---------------- */
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Vault AI error:", error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 500 }
    );
  }
}

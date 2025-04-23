/**
 * Extracts conversation text from transcript messages
 * @param transcript - Raw transcript data
 * @returns Formatted string of the conversation
 */
export const formatTranscriptForAnalysis = (transcript: any[]) => {
    if (!transcript || !Array.isArray(transcript)) {
        return "No transcript data available."
    }

    let formattedText = ""

    transcript.forEach((entry, index) => {
        if (entry.role && entry.content && entry.role !== "system") {
            const roleLabel = entry.role === "assistant" ? "Interviewer" : "Candidate"
            formattedText += `${roleLabel}: ${entry.content}\n\n`
        }
    })

    return formattedText
}

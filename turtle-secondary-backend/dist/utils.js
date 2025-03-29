"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuer = generateQuer;
function generateQuer(query) {
    const systemPrompt = `Generate a concise, descriptive chat title (3-5 words max) based on the user's initial query. Follow these rules:
1. Focus on the core subject or action from the query
2. Use title case formatting
3. Include relevant emoji at the end
4. Avoid generic terms like "Chat" or "Discussion"
5. Keep it under 25 characters if possible

Examples:
Query: "How to make pizza dough from scratch?"
Title: "Pizza Making Tutorial 🍕"

Query: "Help me debug this Python code for a neural network"
Title: "Python Code Debugging 🐍"

Query: "Best travel destinations in Japan for spring"
Title: "Japan Travel Planning ✈️"

Now create a title for this query: ${query}
`;
    return systemPrompt;
}

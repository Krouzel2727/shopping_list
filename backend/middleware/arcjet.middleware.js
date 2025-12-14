import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        // --- ARCJET OCHRANA (Zatím vypnuto) ---Logika je nefukční
        /*
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: "Rate limit exceeded" });
            if (decision.reason.isBot()) return res.status(403).json({ error: "BOT DETECTED" });
            
            return res.status(403).json({ error: "Access denied" });
        }
        */
        // --------------------------------------

        next(); // Vždy pustíme dál

    } catch (error) {
        console.log(`Arcjet middleware Error: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;
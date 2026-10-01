// 🍂 Configuration for your October 1st Surprise Website
// You can edit any of these values to personalize it for your girlfriend!

export const CONFIG = {
  // 💖 Personal Details
  recipientName: "Anisha / Pandaaaaa", // Her name or cute nickname (e.g., "Aarohi", "Sarah", "Bubu")
  senderName: "Your Anupam", // Your name or signature (e.g., "Anupam", "Your Boy")
  
  // 🗓️ Relationship Timeline
  // Used in Section 3 for calculating the exact days together live
  relationshipStartDate: "2024-11-04", // Format: YYYY-MM-DD
  
  // 📊 Love Stats (fun estimates & inside numbers)
  stats: {
    lateNightCalls: 847,
    messagesSent: 24563,
    insideJokes: 142,
  },

  // 📜 Love Letter Content (Section 5)
  letter: {
    salutation: "Hey you,",
    paragraphs: [
      "I know we're miles apart right now, but today — October 1st — I wanted you to know that distance means absolutely nothing when someone means everything to you.",
      "\"We fell in love in October\" isn't just a TikTok trend or an indie song to me. It's us. It's every midnight call where neither of us wanted to hang up first. It's every laugh that turned a bad day into the best day. It's closing my eyes and wishing you were right next to me.",
      "You are my favorite notification. My 3am comfort thought. The person who makes me smile at my phone screen like an idiot in public.",
      "So here's to us — to this October, to every season ahead, and to every single day that brings us one step closer to closing this distance forever."
    ],
    signoff: "Forever yours,",
  },

  // 🎵 October Playlist (Section 6)
  playlist: [
    {
      id: 1,
      icon: "🍂",
      title: "we fell in love in october",
      artist: "girl in red",
      note: "The anthem that started it all — you will be my world.",
      link: "https://open.spotify.com/search/we%20fell%20in%20love%20in%20october",
    },
    {
      id: 2,
      icon: "🌙",
      title: "Electric Love",
      artist: "BØRNS",
      note: "How every call with you feels, even across the miles.",
      link: "https://open.spotify.com/search/Electric%20Love%20BORNS",
    },
    {
      id: 3,
      icon: "💫",
      title: "Perfect",
      artist: "Ed Sheeran",
      note: "Our slow dance song the day we finally reunite.",
      link: "https://open.spotify.com/search/Perfect%20Ed%20Sheeran",
    },
    {
      id: 4,
      icon: "🌸",
      title: "Lover",
      artist: "Taylor Swift",
      note: "Can I go where you go? Can we always be this close?",
      link: "https://open.spotify.com/search/Lover%20Taylor%20Swift",
    },
    {
      id: 5,
      icon: "🍁",
      title: "Golden Hour",
      artist: "JVKE",
      note: "Because whenever I look at your photos, it's golden hour.",
      link: "https://open.spotify.com/search/Golden%20Hour%20JVKE",
    },
  ],

  // 🃏 Memory Match Pairs (Section 4)
  memories: [
    { id: 'sunset', label: 'Sunsets', message: "Every sunset reminds me of you 🌅" },
    { id: 'music', label: 'Our Songs', message: "Our playlist never ends 🎵" },
    { id: 'coffee', label: 'Late Nights', message: "Late-night chai & talks that never get old ☕" },
    { id: 'phone', label: 'Calls', message: "Hours that felt like mere minutes with you 📞" },
    { id: 'smile', label: 'Laughter', message: "You make me laugh like nobody else can 😂" },
    { id: 'heart', label: 'Forever', message: "My heart is always right where you are 💌" },
  ],

  // 🌟 Grand Finale (Section 7)
  finale: {
    line1: "\"My girl, my girl, my girl...\"",
    line2: "\"You will be my world.\"",
    line3: "— us, every October, forever. 🍂",
    celebrationText: "Happy October 1st, {name} 💛",
    // celebrationSubtext: "Distance is just a test to see how far love can travel.",
    easterEggPrompt: "P.S. — You're the reason I smile at my phone at 2am. Always and forever. 🌙",
  }
};

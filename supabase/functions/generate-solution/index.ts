
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { description, imageUrl } = await req.json()

    // In a real implementation, this would call the Gemini API
    // For now, we'll generate a detailed multi-paragraph response with steps
    
    // Generate a more detailed solution based on the image and description
    const solution = generateDetailedSolution(description);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return new Response(
      JSON.stringify({ 
        solution,
        status: 'success' 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: 'error' 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 500
      }
    )
  }
})

function generateDetailedSolution(description: string) {
  // Generate random number between 1000-2000 to create varying length responses
  const wordCount = Math.floor(Math.random() * 1000) + 1000;
  
  // Create a very detailed multi-paragraph solution
  const problemWords = ["broken", "leaking", "error", "not working", "issue", "problem"];
  const deviceWords = ["device", "appliance", "computer", "smartphone", "faucet", "furniture", "system"];
  
  // Use some of the words from the description to make it feel more personalized
  const descriptionWords = description.split(" ");
  const relevantWords = descriptionWords.filter(word => word.length > 3).slice(0, 3);
  
  // Identify what kind of problem we're dealing with
  let problemType = "technical issue";
  for (const word of problemWords) {
    if (description.toLowerCase().includes(word)) {
      problemType = word;
      break;
    }
  }
  
  // Identify what device we're dealing with
  let deviceType = "item";
  for (const word of deviceWords) {
    if (description.toLowerCase().includes(word)) {
      deviceType = word;
      break;
    }
  }
  
  // Create a rich solution with multiple sections
  return `# Analysis of Your ${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}

Based on the image you provided and your description: "${description.substring(0, 50)}${description.length > 50 ? '...' : ''}", I've identified the problem as a ${problemType} with your ${deviceType}. Here's a comprehensive solution:

## Initial Assessment

The ${deviceType} appears to be experiencing a ${problemType} that's likely caused by ${Math.random() > 0.5 ? 'internal component failure' : 'improper configuration'}. This is a common issue that can be resolved with the right approach.

## Required Tools

For this repair, you'll need:
- Phillips screwdriver (size #00 or #0)
- Soft cleaning cloth
- Isopropyl alcohol (70-90%)
- Small container for screws
- Optionally: compressed air can
- ${relevantWords[0] || 'Replacement parts'} if necessary

## Step-by-Step Solution

### 1. Preparation
- Ensure the ${deviceType} is completely powered off and unplugged
- Work in a well-lit, clean environment
- Place a soft towel underneath to prevent scratches

### 2. Diagnostics
- Visually inspect for any obvious damage
- Test basic functionality to confirm the exact nature of the ${problemType}
- Check for loose connections or physical damage

### 3. Disassembly (if necessary)
- Remove the back panel by unscrewing the 4-6 screws around the perimeter
- Carefully lift the panel away, noting the orientation for reassembly
- Take photos of the internal layout before proceeding further

### 4. Repair Process
- Clean any dust or debris using compressed air
- Check for loose cables and reconnect if necessary
- If you notice corrosion, gently clean with isopropyl alcohol
- Replace any obviously damaged components
- ${Math.random() > 0.5 ? 'Reset the system to factory settings by pressing and holding the reset button for 10 seconds' : 'Update the firmware to the latest version using the manufacturer\'s website'}

### 5. Reassembly
- Carefully replace all components in reverse order
- Ensure all cables are properly seated
- Replace the back panel and screws, being careful not to overtighten

### 6. Testing
- Power on the ${deviceType} and verify the ${problemType} is resolved
- Run through basic functions to ensure everything is working properly
- Monitor for any signs of recurring issues

## Preventative Maintenance

To prevent this issue from happening again:
- Perform regular cleaning every 3-6 months
- Keep software and firmware updated
- Avoid exposing the ${deviceType} to extreme temperatures
- Consider a surge protector to prevent electrical damage

## If Problems Persist

If you're still experiencing issues after following these steps, you may need to:
1. Contact the manufacturer for specialized support
2. Consider professional repair services
3. Check warranty status for potential replacement

I hope this solution helps you resolve the ${problemType} with your ${deviceType}! Let me know if you need any clarification on any of the steps.`;
}

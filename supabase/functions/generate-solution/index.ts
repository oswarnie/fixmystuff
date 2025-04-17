
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
    // For now, we'll simulate a response
    const solutions = [
      `Based on the image and your description: "${description.substring(0, 30)}...", here's how to fix it:\n\n1. Unplug the device and wait 30 seconds\n2. Remove the back panel using a Phillips screwdriver\n3. Check for loose connections or damaged components\n4. Reconnect any loose cables\n5. Replace the back panel and power on the device`,
      
      `After analyzing your item with the description: "${description.substring(0, 30)}...", I recommend:\n\n1. Clean the affected area with isopropyl alcohol\n2. Allow to dry completely (approximately 10 minutes)\n3. Apply adhesive to the broken section\n4. Hold firmly for 60 seconds\n5. Let cure for 24 hours before using`,
      
      `To fix this issue described as: "${description.substring(0, 30)}...", follow these steps:\n\n1. Reset the system by holding the power button for 10 seconds\n2. Update the firmware to the latest version\n3. Clear the cache by navigating to Settings > Storage > Clear Cache\n4. Restart the device\n5. If the problem persists, check for hardware damage`,
      
      `For your problem described as: "${description.substring(0, 30)}...", the solution is:\n\n1. Check if the item is properly connected to power\n2. Inspect for visible damage to the exterior\n3. Test with an alternative power source\n4. Reset to factory settings using the pinhole reset button\n5. If these steps don't resolve the issue, the internal component may need replacement`
    ]
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Return a random solution
    const solution = solutions[Math.floor(Math.random() * solutions.length)]
    
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

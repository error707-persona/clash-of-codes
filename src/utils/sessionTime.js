export const sessionTime = (current_time, match_time) =>  {
    // Convert times to milliseconds since Unix epoch
    const current_time_ms = new Date(current_time).getTime();
    const match_time_ms = new Date(match_time).getTime();
  
    // Calculate the absolute difference between the two times
    const time_diff_ms = Math.abs(current_time_ms - match_time_ms);
  
    // Convert 24 hours to milliseconds
    const twenty_four_hours_ms = 24 * 60 * 60 * 1000;
  
    // Compare the time difference to 24 hours
    return time_diff_ms < twenty_four_hours_ms;
  }

export const analyzeCodeComplexity = (code) => {
  // Simple code pattern analysis
  const codeLower = code.toLowerCase()
  const forLoops = codeLower.match(/for\s*\(/g) || []
  const loopCount = forLoops.length
  
  console.log('Debug - Code analysis:', {
    codeLower: codeLower.substring(0, 100) + '...',
    loopCount,
    hasFor: codeLower.includes('for'),
    hasI: codeLower.includes('i'),
    hasJ: codeLower.includes('j'),
    hasN: codeLower.includes('n'),
    hasM: codeLower.includes('m')
  })
  
  // Check for nested loops by looking for loops that might be nested
  // This is a simplified check - in a real implementation, you'd need more sophisticated parsing
  const hasNestedLoops = loopCount > 1 && 
                        codeLower.includes('for') && 
                        codeLower.includes('{') && codeLower.includes('}') &&
                        // Look for patterns that suggest nesting (like i and j loops)
                        ((codeLower.includes('i') && codeLower.includes('j')) ||
                         (codeLower.includes('i++') && codeLower.includes('j++')))
  
  // Check for sequential loops (separate loops that run one after another)
  // This is the most common case for code snippets
  const hasSequentialLoops = loopCount > 1 && !hasNestedLoops
  
  const hasSingleLoop = loopCount === 1
  
  const hasRecursion = codeLower.includes('function') && codeLower.includes('(') && 
                      (codeLower.includes('return') || codeLower.includes('call'))
  
  console.log('Debug - Pattern detection:', {
    hasNestedLoops,
    hasSequentialLoops,
    hasSingleLoop,
    hasRecursion
  })
  
  let complexity, explanation, optimization
  
  if (hasNestedLoops) {
    complexity = 'O(n²)'
    explanation = 'This code contains nested loops where the outer loop iterates n times and the inner loop also iterates n times, resulting in n × n = n² operations.'
    optimization = 'Consider using a hash map or other data structure to reduce the time complexity to O(n).'
  } else if (hasSequentialLoops) {
    complexity = 'O(N+M)'
    explanation = 'This code has multiple separate loops that run sequentially. Since they are not nested, the total time complexity is the sum of all loops: O(N+M) where N and M represent the number of iterations in each loop.'
    optimization = 'This is already quite efficient for sequential operations. Consider if the loops can be combined into a single pass if they operate on the same data.'
  } else if (hasSingleLoop) {
    complexity = 'O(n)'
    explanation = 'This code contains a single loop that iterates n times, resulting in linear time complexity.'
    optimization = 'This is already optimal for a single pass through the data. Consider if the loop can be vectorized or parallelized for better performance.'
  } else if (hasRecursion) {
    complexity = 'O(log n)'
    explanation = 'This code appears to use recursion, which typically results in logarithmic time complexity depending on how the problem is divided.'
    optimization = 'Consider if the recursion can be converted to iteration to avoid stack overflow for large inputs.'
  } else {
    complexity = 'O(1)'
    explanation = 'This code performs a constant number of operations regardless of input size.'
    optimization = 'This is already optimal. No further optimization needed for time complexity.'
  }
  
  return {
    complexity,
    explanation,
    optimization,
    code
  }
} 
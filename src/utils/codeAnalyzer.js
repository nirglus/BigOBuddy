export const analyzeCodeComplexity = (code) => {
  console.log('Debug - Analyzing code:', code)
  
  // Parse and analyze each loop mathematically
  const analyzeLoop = (loopCode) => {
    console.log('Debug - Analyzing loop:', loopCode)
    
    // Check if it's a for loop or while loop
    if (loopCode.trim().startsWith('for')) {
      return analyzeForLoop(loopCode)
    } else if (loopCode.trim().startsWith('while')) {
      return analyzeWhileLoop(loopCode)
    } else {
      return { 
        complexity: 'unknown', 
        explanation: 'Could not parse loop structure',
        type: 'unknown'
      }
    }
  }
  
  const analyzeForLoop = (loopCode) => {
    // Extract loop components using regex
    const loopMatch = loopCode.match(/for\s*\(\s*([^;]+);\s*([^;]+);\s*([^)]+)\s*\)/i)
    if (!loopMatch) {
      console.log('Debug - Could not parse for loop structure')
      return { 
        complexity: 'unknown', 
        explanation: 'Could not parse for loop structure',
        type: 'for'
      }
    }
    
    const [, initialization, condition, increment] = loopMatch
    
    console.log('Debug - For loop components:', { initialization, condition, increment })
    
    // Analyze each component
    const initAnalysis = analyzeInitialization(initialization.trim())
    const conditionAnalysis = analyzeCondition(condition.trim())
    const incrementAnalysis = analyzeIncrement(increment.trim())
    
    // Also analyze the loop body for variable modifications
    const bodyAnalysis = analyzeLoopBody(loopCode)
    
    console.log('Debug - For loop component analyses:', { 
      initAnalysis: initAnalysis, 
      conditionAnalysis, 
      incrementAnalysis,
      bodyAnalysis 
    })
    
    // Calculate complexity based on components and body
    const complexity = calculateForLoopComplexity(initAnalysis, conditionAnalysis, incrementAnalysis, bodyAnalysis)
    const explanation = generateForLoopExplanation(initAnalysis, conditionAnalysis, incrementAnalysis, bodyAnalysis, complexity)
    
    return {
      complexity,
      explanation,
      type: 'for',
      components: { 
        initialization: initAnalysis, 
        condition: conditionAnalysis, 
        increment: incrementAnalysis,
        body: bodyAnalysis
      }
    }
  }
  
  const analyzeWhileLoop = (loopCode) => {
    // Extract while loop condition
    const whileMatch = loopCode.match(/while\s*\(\s*([^)]+)\s*\)/i)
    if (!whileMatch) {
      console.log('Debug - Could not parse while loop structure')
      return { 
        complexity: 'unknown', 
        explanation: 'Could not parse while loop structure',
        type: 'while'
      }
    }
    
    const condition = whileMatch[1].trim()
    console.log('Debug - While loop condition:', condition)
    
    // Analyze the condition
    const conditionAnalysis = analyzeWhileCondition(condition)
    console.log('Debug - While loop condition analysis:', conditionAnalysis)
    
    // Analyze the loop body for variable changes
    const bodyAnalysis = analyzeLoopBody(loopCode)
    console.log('Debug - While loop body analysis:', bodyAnalysis)
    
    // Calculate complexity based on condition and body
    const complexity = calculateWhileLoopComplexity(conditionAnalysis, bodyAnalysis)
    const explanation = generateWhileLoopExplanation(conditionAnalysis, bodyAnalysis, complexity)
    
    return {
      complexity,
      explanation,
      type: 'while',
      components: { condition: conditionAnalysis, body: bodyAnalysis }
    }
  }
  
  const analyzeWhileCondition = (condition) => {
    const cleanCondition = condition.replace(/\s+/g, '').toLowerCase()
    
    // Extract variable and comparison
    const match = cleanCondition.match(/([a-z])\s*([<>=!]+)\s*(.+)/)
    if (!match) return { variable: 'unknown', operator: 'unknown', limit: 'unknown', type: 'unknown' }
    
    const [, variable, operator, limit] = match
    
    // Parse the limit expression
    const limitAnalysis = parseLimitExpression(limit)
    
    return {
      variable,
      operator,
      limit: limitAnalysis.value,
      limitType: limitAnalysis.type,
      original: condition,
      type: 'condition'
    }
  }
  
  const analyzeLoopBody = (loopCode) => {
    // Extract the body of the loop (between braces)
    const bodyMatch = loopCode.match(/\{\s*([^}]*)\s*\}/s)
    if (!bodyMatch) {
      return { changes: [], type: 'unknown' }
    }
    
    const body = bodyMatch[1]
    const changes = []
    
    // Look for variable modifications in the body
    const lines = body.split('\n')
    for (const line of lines) {
      const trimmedLine = line.trim()
      
      // Look for increment/decrement operations
      if (trimmedLine.match(/[a-z]\+\+/) || trimmedLine.match(/\+\+[a-z]/)) {
        changes.push({ type: 'increment', operation: '++', variable: trimmedLine.match(/([a-z])\+\+/)?.[1] || trimmedLine.match(/\+\+([a-z])/)?.[1] })
      }
      
      if (trimmedLine.match(/[a-z]--/) || trimmedLine.match(/--[a-z]/)) {
        changes.push({ type: 'decrement', operation: '--', variable: trimmedLine.match(/([a-z])--/)?.[1] || trimmedLine.match(/--([a-z])/)?.[1] })
      }
      
      // Look for compound assignments
      const compoundMatch = trimmedLine.match(/([a-z])\s*([+\-*/]?=)\s*(.+)/)
      if (compoundMatch) {
        const [, variable, operation, value] = compoundMatch
        changes.push({ type: 'compound', operation, variable, value: value.trim() })
      }
    }
    
    return { changes, type: 'body' }
  }
  
  const calculateWhileLoopComplexity = (condition, body) => {
    // Analyze the changes in the loop body
    const hasLinearChange = body.changes.some(change => 
      change.type === 'increment' || 
      change.type === 'decrement' || 
      (change.type === 'compound' && (change.operation === '+=' || change.operation === '-='))
    )
    
    const hasMultiplicativeChange = body.changes.some(change => 
      change.type === 'compound' && (change.operation === '*=' || change.operation === '/=')
    )
    
    // Determine complexity based on condition and body changes
    if (hasMultiplicativeChange) {
      return 'O(log n)'
    }
    
    if (condition.limitType === 'quadratic') {
      return 'O(n²)'
    }
    
    if (condition.limitType === 'constant') {
      return 'O(1)'
    }
    
    // Default to linear for while loops with linear changes
    return 'O(n)'
  }
  
  const generateWhileLoopExplanation = (condition, body, complexity) => {
    if (complexity === 'O(log n)') {
      return `While loop with multiplicative changes in body - exponential growth pattern results in logarithmic complexity.`
    }
    
    if (condition.limitType === 'quadratic') {
      return `While loop iterates until ${condition.limit} - quadratic limit results in O(n²) complexity.`
    }
    
    if (condition.limitType === 'constant') {
      return `While loop iterates until constant ${condition.limit} - constant time complexity.`
    }
    
    return `While loop iterates until ${condition.limit} with linear changes in body - linear complexity.`
  }
  
  const analyzeInitialization = (init) => {
    const cleanInit = init.replace(/\s+/g, '').toLowerCase()
    
    // Extract variable and initial value
    const match = cleanInit.match(/(?:let|var|const)?\s*([a-z])\s*=\s*([^;]+)/)
    if (!match) return { variable: 'unknown', value: 'unknown', type: 'unknown' }
    
    const [, variable, value] = match
    
    return {
      variable,
      value: value.trim(),
      type: 'initialization',
      original: init
    }
  }
  
  const analyzeCondition = (condition) => {
    const cleanCondition = condition.replace(/\s+/g, '').toLowerCase()
    
    // Extract variable, operator, and limit
    const match = cleanCondition.match(/([a-z])\s*([<>=!]+)\s*(.+)/)
    if (!match) return { variable: 'unknown', operator: 'unknown', limit: 'unknown', type: 'unknown' }
    
    const [, variable, operator, limit] = match
    
    // Parse the limit expression
    const limitAnalysis = parseLimitExpression(limit)
    
    return {
      variable,
      operator,
      limit: limitAnalysis.value,
      limitType: limitAnalysis.type,
      original: condition,
      type: 'condition'
    }
  }
  
  const parseLimitExpression = (limit) => {
    const cleanLimit = limit.replace(/\s+/g, '').toLowerCase()
    
    // Handle different limit expressions
    if (cleanLimit === 'n') {
      return { value: 'n', type: 'linear' }
    }
    
    if (cleanLimit.includes('/')) {
      // Division: n/2, n/3, etc.
      const parts = cleanLimit.split('/')
      if (parts[0] === 'n' && !isNaN(parts[1])) {
        return { value: `n/${parts[1]}`, type: 'division' }
      }
    }
    
    if (cleanLimit.includes('*')) {
      // Multiplication: n*2, n*n, etc.
      const parts = cleanLimit.split('*')
      if (parts[0] === 'n' && parts[1] === 'n') {
        return { value: 'n²', type: 'quadratic' }
      } else if (parts[0] === 'n' && !isNaN(parts[1])) {
        return { value: `n*${parts[1]}`, type: 'multiplication' }
      }
    }
    
    // Handle arithmetic: n-1, n+1, etc.
    if (cleanLimit.match(/^n[+\-]\d+$/)) {
      return { value: cleanLimit, type: 'linear' }
    }
    
    // Handle constants
    if (!isNaN(cleanLimit)) {
      return { value: cleanLimit, type: 'constant' }
    }
    
    return { value: cleanLimit, type: 'unknown' }
  }
  
  const analyzeIncrement = (increment) => {
    const cleanIncrement = increment.replace(/\s+/g, '').toLowerCase()
    
    // Handle different increment patterns
    if (cleanIncrement === 'i++' || cleanIncrement === '++i') {
      return {
        variable: 'i',
        operation: '++',
        value: '1',
        type: 'linear',
        growthRate: 'constant',
        original: increment
      }
    }
    
    // Handle compound assignments: i+=2, i*=2, i/=2, etc.
    const match = cleanIncrement.match(/([a-z])\s*([+\-*/]?=)\s*(.+)/)
    if (match) {
      const [, variable, operation, value] = match
      
      let type, growthRate
      
      if (operation === '+=' || operation === '-=') {
        type = 'linear'
        growthRate = 'constant'
      } else if (operation === '*=' || operation === '/=') {
        type = 'multiplicative'
        growthRate = 'exponential'
      }
      
      return {
        variable,
        operation,
        value: value.trim(),
        type,
        growthRate,
        original: increment
      }
    }
    
    return {
      variable: 'unknown',
      operation: 'unknown',
      value: 'unknown',
      type: 'unknown',
      growthRate: 'unknown',
      original: increment
    }
  }
  

  
  const calculateForLoopComplexity = (init, condition, increment, body) => {
    // Check if there are multiplicative changes in the loop body
    const hasMultiplicativeChangeInBody = body.changes.some(change => 
      change.type === 'compound' && (change.operation === '*=' || change.operation === '/=')
    )
    
    // Check if there are multiplicative changes in the increment
    const hasMultiplicativeIncrement = increment.type === 'multiplicative'
    
    // If there are multiplicative changes (either in body or increment), it's logarithmic
    if (hasMultiplicativeChangeInBody || hasMultiplicativeIncrement) {
      return 'O(log n)'
    }
    
    // Check for linear changes in body
    const hasLinearChangeInBody = body.changes.some(change => 
      change.type === 'increment' || 
      change.type === 'decrement' || 
      (change.type === 'compound' && (change.operation === '+=' || change.operation === '-='))
    )
    
    // If there are linear changes in body, it might affect the complexity
    if (hasLinearChangeInBody) {
      // If the increment is also linear (i++), it's still linear
      if (increment.type === 'linear') {
        return 'O(n)'
      }
    }
    
    // Determine complexity based on increment type and condition
    if (increment.type === 'multiplicative') {
      return 'O(log n)'
    }
    
    if (condition.limitType === 'quadratic') {
      return 'O(n²)'
    }
    
    if (condition.limitType === 'constant') {
      return 'O(1)'
    }
    
    // Default to linear
    return 'O(n)'
  }
  
  const generateForLoopExplanation = (init, condition, increment, body, complexity) => {
    // Check for multiplicative changes in body
    const multiplicativeChanges = body.changes.filter(change => 
      change.type === 'compound' && (change.operation === '*=' || change.operation === '/=')
    )
    
    if (multiplicativeChanges.length > 0) {
      const change = multiplicativeChanges[0]
      return `For loop with ${change.operation}${change.value} in body - exponential growth pattern results in logarithmic complexity.`
    }
    
    if (increment.type === 'multiplicative') {
      return `For loop with ${increment.operation}${increment.value} - exponential growth pattern results in logarithmic complexity.`
    }
    
    if (condition.limitType === 'quadratic') {
      return `For loop iterates up to ${condition.limit} - quadratic limit results in O(n²) complexity.`
    }
    
    if (condition.limitType === 'constant') {
      return `For loop iterates up to constant ${condition.limit} - constant time complexity.`
    }
    
    return `For loop iterates up to ${condition.limit} with ${increment.original} - linear complexity.`
  }
  
  // Extract all loops from the code
  const extractLoops = (code) => {
    const loops = []
    const lines = code.split('\n')
    let currentLoop = []
    let inLoop = false
    let braceCount = 0
    
    for (const line of lines) {
      const trimmedLine = line.trim()
      
      // Check if this line starts a for or while loop
      if (trimmedLine.match(/^(for|while)\s*\(/)) {
        if (inLoop) {
          // We found a new loop while still in another loop - this is nested
          loops.push({ type: 'nested', code: currentLoop.join('\n') })
        }
        inLoop = true
        currentLoop = [trimmedLine]
        braceCount = 0
        continue
      }
      
      if (inLoop) {
        currentLoop.push(trimmedLine)
        
        // Count braces
        const openBraces = (trimmedLine.match(/\{/g) || []).length
        const closeBraces = (trimmedLine.match(/\}/g) || []).length
        braceCount += openBraces - closeBraces
        
        // If we've closed all braces, the loop is complete
        if (braceCount <= 0) {
          loops.push({ 
            type: 'sequential', 
            code: currentLoop.join('\n')
          })
          inLoop = false
          currentLoop = []
        }
      }
    }
    
    return loops
  }
  
  // Simplify complexity expression
  const simplifyComplexity = (complexities) => {
    if (complexities.length === 0) return 'O(1)'
    if (complexities.length === 1) return complexities[0]
    
    // Sort complexities by order of growth (highest first)
    const complexityOrder = {
      'O(1)': 0,
      'O(log n)': 1,
      'O(n)': 2,
      'O(n log n)': 3,
      'O(n²)': 4,
      'O(n³)': 5,
      'O(2ⁿ)': 6
    }
    
    const sorted = complexities.sort((a, b) => 
      (complexityOrder[b] || 0) - (complexityOrder[a] || 0)
    )
    
    // Return the highest complexity (dominates the others)
    return sorted[0]
  }
  
  // Extract and analyze all loops
  const extractedLoops = extractLoops(code)
  console.log('Debug - Extracted loops:', extractedLoops)
  
  // Analyze each loop
  const loopAnalyses = extractedLoops.map(loop => ({
    ...loop,
    analysis: analyzeLoop(loop.code)
  }))
  
  console.log('Debug - Loop analyses:', loopAnalyses)
  
  // Determine overall complexity
  let overallComplexity, explanation, optimization, loopSummary
  
  if (extractedLoops.length === 0) {
    overallComplexity = 'O(1)'
    explanation = 'No loops found in the code.'
    optimization = 'This is already optimal.'
    loopSummary = []
  } else if (extractedLoops.length === 1) {
    const analysis = loopAnalyses[0].analysis
    overallComplexity = analysis.complexity
    explanation = analysis.explanation
    optimization = 'This is already quite efficient for a single loop.'
    loopSummary = [`Loop 1: ${analysis.complexity} – ${analysis.explanation}`]
  } else {
    // Multiple loops - check if they're nested or sequential
    const hasNestedLoops = extractedLoops.some(loop => loop.type === 'nested')
    
    if (hasNestedLoops) {
      overallComplexity = 'O(n²)'
      explanation = 'This code contains nested loops, resulting in quadratic time complexity.'
      optimization = 'Consider using a hash map or other data structure to reduce complexity.'
      loopSummary = loopAnalyses.map((loop, index) => 
        `Loop ${index + 1}: ${loop.analysis.complexity} – ${loop.analysis.explanation}`
      )
    } else {
      // Sequential loops - analyze each and combine
      const complexities = loopAnalyses.map(loop => loop.analysis.complexity)
      const simplifiedComplexity = simplifyComplexity(complexities)
      
      loopSummary = loopAnalyses.map((loop, index) => 
        `Loop ${index + 1}: ${loop.analysis.complexity} – ${loop.analysis.explanation}`
      )
      
      if (complexities.length > 1) {
        const complexityExpression = complexities.join(' + ')
        overallComplexity = simplifiedComplexity
        explanation = `This code has ${complexities.length} sequential loops with complexities: ${complexityExpression}. The dominant term is ${simplifiedComplexity}.`
        optimization = 'Consider combining loops if they operate on the same data to reduce overhead.'
      } else {
        overallComplexity = complexities[0]
        explanation = loopAnalyses[0].analysis.explanation
        optimization = 'This is already quite efficient.'
      }
    }
  }
  
  return {
    complexity: overallComplexity,
    explanation,
    optimization,
    code,
    loopSummary,
    detailedAnalysis: loopAnalyses
  }
} 
# BigO Buddy

An interactive web application that helps developers understand the time complexity (Big O notation) of their JavaScript code. Simply paste your code, click "Analyze", and get a detailed explanation of the algorithm's efficiency.

<img width="1916" height="818" alt="צילום מסך 2025-07-27 211340" src="https://github.com/user-attachments/assets/a3090f79-6210-4a23-aca4-d7a15e9ea0a3" />
<img width="1919" height="812" alt="צילום מסך 2025-07-27 211402" src="https://github.com/user-attachments/assets/0a5b7e65-0564-4279-8c8f-95a8149393b3" />

## Features

- **Code Analysis**: Paste JavaScript code and get instant time complexity analysis
- **Beginner-Friendly Explanations**: Clear, easy-to-understand explanations of why certain algorithms have specific time complexities
- **Optimization Suggestions**: Get recommendations for improving your code's efficiency
- **Beautiful UI**: Modern, responsive design built with React and Tailwind CSS
- **Real-time Feedback**: Loading states and error handling for a smooth user experience

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Language**: JavaScript/JSX
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bigobuddy.git
cd bigobuddy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Open the application in your browser
2. Paste your JavaScript code into the text area
3. Click the "Analyze Code" button
4. Review the analysis results including:
   - Time complexity in Big O notation
   - Explanation of why that complexity occurs
   - Suggestions for optimization
   - Your analyzed code

## Example Code to Try

```javascript
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}
```

This code has O(n²) time complexity due to the nested loops.

## Project Structure

```
bigobuddy/
├── public/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles with Tailwind directives
│   └── main.jsx         # Application entry point
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── package.json         # Project dependencies and scripts
└── README.md           # This file
```

## Future Enhancements

- [ ] Integration with OpenAI GPT API for real-time analysis
- [ ] Support for multiple programming languages (Python, Java, C++)
- [ ] Practice mode with sample code challenges
- [ ] Syntax highlighting for code input
- [ ] Visualization of algorithm performance with different input sizes
- [ ] Code execution and benchmarking
- [ ] User accounts and analysis history

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)

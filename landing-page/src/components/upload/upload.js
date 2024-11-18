import React, { useRef, useState } from 'react'
import { FaArrowLeft, FaUpload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import pdfToText from 'react-pdftotext';
import OpenAI from 'openai';
import '../../styles/components/upload/Upload.css'

function UploadComponent({ onSubmit }) {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [pdfText, setPdfText] = useState('');
    const [prompt, setPrompt] = useState('test'); 
    const [selectedFile, setSelectedFile] = useState(null);
    const [materialName, setMaterialName] = useState('');

    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Use environment variable for API key
        dangerouslyAllowBrowser: true,
    });

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            extractText(file);
        }
    };

    const extractText = (file) => {
        pdfToText(file)
          .then((text) => {
            setPdfText(text); // Update PDF text state
          })
          .catch((error) =>
            console.error('Failed to extract text from PDF', error)
          );
    };

    const handleRedirectMenu = () => {
        navigate('/menu');
    };

    const handleRedirectUpload = () => {
        sendTextToChatbot();
        navigate('/menu/upload');
    };

    const sendTextToChatbot = async () => {

        if (!pdfText) {
          alert('Please upload a PDF and extract text first!');
          return;
        }
    
        const prompts = {
          summary: 'Please summarize the following text. The summary should be perfectly formated for markdown reading with nice aesthetics: ',
          test: 'Please make a practice test of the following text. The test should be perfectly formated for markdown reading with nice aesthetics and it should contains different types of problems (multiple choice, open, etc). Please add at the end the answers: ',
          eli: 'Please ELI5 the following text. The ELI5 should be perfectly formated for markdown reading with nice aesthetics: ',
          flashcards: 'Please generate flashcards for the following text: ',
        };
    
        const selectedPrompt = prompts[prompt] || 'Please process the following text:';

        if (prompt === 'flashcards') {
            await generateFlashcards(pdfText);
            return;
        }

        try {
            const completion = await openai.chat.completions.create({
              model: 'gpt-4o-mini', // Use the specific OpenAI model
              messages: [
                {
                  role: 'system',
                  content:
                    'You are a professional teacher, passionate about helping students learn and succeed. Your explanations are clear, detailed, and easy to understand, always aiming to make even the most complex topics accessible to everyone. You are patient, empathetic, and always take the time to ensure students grasp the material fully, guiding them step by step. Your goal is to help students pass their exams with confidence, fostering a positive learning environment where no question is too small and every explanation is crafted with care. Your test are loved by everyone and are perfect for the students to evaluate their knowledge',
                },
                {
                  role: 'user',
                  content: `${selectedPrompt} \n\n${pdfText}`, // Pass the extracted text as the user input
                },
              ],
        });

        // Log the entire response to see what it returns
        console.log('Chatbot response:', completion);

        // Check if the response has a 'choices' array and the first message is present
        if (completion && completion.choices && completion.choices[0]) {
            const generatedText = completion.choices[0].message.content;
            const data = {
                text: generatedText,
                name: materialName,
                isflashcards: false,
            };
            console.log(data);
            onSubmit(data); // Send data to the parent component
        } else {
            console.error('Unexpected response format:', completion);
        }
        } catch (error) {
        console.error('Error sending text to chatbot:', error);
        }
    };

    const generateFlashcards = async (text) => {
        try {
          const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', 
            messages: [
              { 
                role: 'system', 
                content: 'You are a helpful assistant. You will not engage in any conversation with the user outside of generating flashcards. You will output the exact format as requested. You will not output anything else. Not even a "Sure thing" or anything similar. Just the precise format of the flashcards. Everything will be in plain text, so no markdown format. Your objective is to make flashcards so students can review important concepts. So do your best.' 
              },
              {
                role: 'user',
                content: `Generate a list of 20 key terms and definitions based on the following text. Each key term should be followed by its definition.\nONLY KEY TERMS AND CONCPETS YOU DEEM AS IMPORTANT AND CAN HELP THE STUDENT LEARN. It should come in the following format: term: definition\n${text}`,
              },
            ],
          });
    
          const content = completion.choices[0].message.content;
          const data = {
            text: content,
            name: materialName,
            isflashcards: true,
        };
        console.log(data);
        onSubmit(data); // Send data to the parent component
        } catch (error) {
          console.error('Error generating flashcards:', error);
        }
    };
    

    return (
        <div className="upload-material-container" >
            <button className="back-button" onClick={handleRedirectMenu}>
                <FaArrowLeft className="back-icon" />
                Regresar
            </button>

            <div className="upload-area" onClick={handleUploadClick} >
                <FaUpload className="upload-icon" />
                <p>{selectedFile ? selectedFile.name : "Subir archivo"}</p>
            </div>

            {/* Hidden file input for triggering the upload */}
            <input
                type="file"
                accept='application/pdf'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <input 
                type="text" 
                placeholder="Nombre del material" 
                className="input-field"
                onChange={(e) => setMaterialName(e.target.value)}
            />

            <div className="dropdown">
                <select className="dropdown-select" value={prompt} onChange={(e) => setPrompt(e.target.value)}>
                    <option value="test">Test de practica</option>
                    <option value="summary">Resumen</option>
                    <option value="eli">ELI5</option>
                    <option value="flashcards">Flashcards</option>
                </select>
            </div>

            <button className="generate-button" onClick={handleRedirectUpload}>Generar</button>
                    
        </div>
    )
}

export default UploadComponent
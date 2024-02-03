import TextEditor from "@/components/text-editor/TextEditor"


// Creating a Text Editor using React Quill
// https://youtu.be/I3JQNq7Cbt0
// https://www.npmjs.com/package/react-quill





const TextPage = () => {
    return (
        <div className="min-h-screen opacity-0 delayed-fade-in">

            <TextEditor />
        </div>
    )
}

export default TextPage
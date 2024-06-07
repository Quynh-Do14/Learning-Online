import Editor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";

type Props = {
    label: string,
    id: string,
    attribute: string,
    dataAttribute: any,
    setData: Function,
    isRequired: boolean,
}
const TextEditorCommon = (props: Props) => {
    const {
        label,
        id,
        attribute,
        dataAttribute,
        setData,
        isRequired,
    } = props;
    // const editorConfiguration = {
    //     toolbar: {
    //         items: [
    //             "undo",
    //             "redo",
    //             "|",
    //             "heading",
    //             "|",
    //             "fontfamily",
    //             "fontsize",
    //             "fontColor",
    //             "fontBackgroundColor",
    //             "|",
    //             "bold",
    //             "italic",
    //             "strikethrough",
    //             "subscript",
    //             "superscript",
    //             "code",
    //             "|",
    //             "link",
    //             "uploadImage",
    //             "blockQuote",
    //             "codeBlock",
    //             "|",
    //             "alignment",
    //             "|",
    //             "bulletedList",
    //             "numberedList",
    //             "todoList",
    //             "outdent",
    //             "indent",
    //         ],
    //     },
    //     language: "vi",
    //     image: {
    //         toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
    //     },
    //     table: {
    //         contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    //     },
    //     licenseKey: "",
    // };
    
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    const onChange = (_: any, editor: any) => {
        const data = editor.getData();
        setData({
            [attribute]: data || ''
        });
    }
    return (
        <div>
            <div className='mb-4 input-common'>
                <div className='title mb-2'>
                    <span>
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </div>
                <div>
                    <CKEditor
                        editor={Editor}
                        data={value}
                        // config={editorConfiguration}
                        id={id}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default TextEditorCommon;

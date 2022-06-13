
function initQuillTextEditor(textEditors) {

    let toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
    ]

    textEditors.forEach( editor => {
        new Quill(editor, {
            theme: 'snow',
            placeholder: 'Puedes utilizar las opciones de formato en la parte superior.',
            modules: {
                toolbar: toolbarOptions
            }
        });
    })

}

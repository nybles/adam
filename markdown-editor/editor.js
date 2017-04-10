var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
navigator.saveBlob = navigator.saveBlob || navigator.msSaveBlob || navigator.mozSaveBlob || navigator.webkitSaveBlob;
window.saveAs = window.saveAs || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs;

// Because highlight.js is a bit awkward at times
var languageOverrides = {
    js: 'javascript',
    html: 'xml'
};

emojify.setConfig({ img_dir: 'emoji' });

var md = markdownit({
    html: true,
    highlight: function(code, lang){
        if(languageOverrides[lang]) lang = languageOverrides[lang];
        if(lang && hljs.getLanguage(lang)){
            try {
                return hljs.highlight(lang, code).value;
            }catch(e){}
        }
        return '';
    }
})
        .use(markdownitFootnote);


var hashto;
var inElem = document.getElementById("in");

function update(e){
    inElem.style.height = document.getElementById('code').innerText.split('\n').length * window.getComputedStyle(inElem).getPropertyValue("line-height").replace('px', '')*1.5 + 50 +'px';
    setOutput(e.getValue());

    // clearTimeout(hashto);
    // hashto = setTimeout(updateHash, 1000);
}

function setOutput(val){
    val = val.replace(/<equation>((.*?\n)*?.*?)<\/equation>/ig, function(a, b){
        return '<img src="http://latex.codecogs.com/png.latex?' + encodeURIComponent(b) + '" />';
    });

    var out = document.getElementById('out');
    var old = out.cloneNode(true);
    out.innerHTML = md.render(val);
    emojify.run(out);

    var allold = old.getElementsByTagName("*");
    if (allold === undefined) return;

    var allnew = out.getElementsByTagName("*");
    if (allnew === undefined) return;

    for (var i = 0, max = Math.min(allold.length, allnew.length); i < max; i++) {
        if (!allold[i].isEqualNode(allnew[i])) {
            out.scrollTop = allnew[i].offsetTop;
            return;
        }
    }
    inElem.style.height = inElem.innerText.split('\n').length * window.getComputedStyle(inElem).getPropertyValue("line-height").replace('px', '')*1.5 + 50 +'px';
}

var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'gfm',
    lineNumbers: false,
    matchBrackets: true,
    lineWrapping: true,
    theme: 'base16-light',
    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
});

editor.on('change', update);



document.addEventListener('drop', function(e){
    e.preventDefault();
    e.stopPropagation();

    var reader = new FileReader();
    reader.onload = function(e){
        editor.setValue(e.target.result);
    };

    reader.readAsText(e.dataTransfer.files[0]);
}, false);





function saveAsMarkdown(){
    var filename = document.getElementById("blogTitle").value;
    if (filename.length === 0)
        filename = "untitled";
    filename += '.md';
    save(editor.getValue(), filename);
}

function saveAsHtml() {
    var filename = document.getElementById("blogTitle").value;
    if (filename.length === 0)
        filename = "untitled";
    filename += '.md';
    save(document.getElementById('out').innerHTML, filename);
}

/* document.getElementById('saveBtn').addEventListener('click', function() {
 *     console.log("click made");
 *     saveAsMarkdown();
 *     hideMenu();
 * });
 */

function save(code, name){
    var blob = new Blob([code], { type: 'text/plain' });
    if(window.saveAs){
        window.saveAs(blob, name);
    }else if(navigator.saveBlob){
        navigator.saveBlob(blob, name);
    }else{
        url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.setAttribute("href",url);
        link.setAttribute("download",name);
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    }
}




document.addEventListener('keydown', function(e){
    if(e.keyCode == 83 && (e.ctrlKey || e.metaKey)){
        e.shiftKey ? showMenu() : saveAsMarkdown();

        e.preventDefault();
        return false;
    }

    if(e.keyCode === 27){
        hideMenu();

        e.preventDefault();
        return false;
    }
});




function updateHash(){
    window.location.hash = btoa( // base64 so url-safe
        RawDeflate.deflate( // gzip
            unescape(encodeURIComponent( // convert to utf8
                editor.getValue()
            ))
        )
    );
}

if(window.location.hash){
    var h = window.location.hash.replace(/^#/, '');
    if(h.slice(0,5) == 'view:'){
        setOutput(decodeURIComponent(escape(RawDeflate.inflate(atob(h.slice(5))))));
        document.body.className = 'view';
    }else{
        editor.setValue(
            decodeURIComponent(escape(
                RawDeflate.inflate(
                    atob(
                        h
                    )
                )
            ))
        );
        update(editor);
        editor.focus();
    }
}else{
    update(editor);
    editor.focus();
}

inElem.style.height = document.getElementById('code').innerText.split('\n').length * window.getComputedStyle(inElem).getPropertyValue("line-height").replace('px', '')*1.5 + 50 +'px';


// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);

    } else {
        // CORS not supported.
        xhr = null;

    }
    return xhr;
}

// Make the actual CORS request.
// https://www.html5rocks.com/en/tutorials/cors/
function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = "someurlfromgeekhaven.iiita.ac.in/whatever.php";

    var data = new FormData();
    var title = document.getElementById("blogTitle").value;
    var fileName = title + ".md";
    data.append('attachment', editor.getValue(), fileName);

    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;

    }

    // Response handlers.
    xhr.onload = function() {
        var json = xhr.responseJson;
        if (json.ok)
            alert("cors successfully done");
        else
            alert("cors failed");
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    xhr.send(data);
}



window.onload = function() {
    // document.getElementById('submitBtn').onclick = makeCorsRequest;
    document.getElementById("saveBtn").onclick = saveAsMarkdown;
    var inElem = document.getElementById("in");
    var outElem = document.getElementById("out");
    var intoggle = document.getElementById("toggleEditorBtn");
    var outtoggle = document.getElementById("togglePreviewBtn");

    function toggleView(showIn, showOut) {
        if (showIn && showOut) {
            console.log("case 1");
            inElem.style.display = outElem.style.display = "block";
            inElem.style.width = outElem.style.width = "50%";
        } else if (showIn && !showOut) {
            console.log("case 2");
            inElem.style.display = "block";
            outElem.style.display = "none";
            inElem.style.width = "100%";
            outElem.style.width = "0";
        } else if (!showIn && showOut) {
            console.log("case 3");
            inElem.style.display = "none";
            outElem.style.display = "block";
            inElem.style.width = "0%";
            outElem.style.width = "100%";
        } else if (!showIn && !showOut) {
            console.log("case 4");
            inElem.style.display = "none";
            outElem.style.display = "none";
        } else {
            console.log("WTF");
        }
    }

    intoggle.addEventListener("click", function() {
        toggleView(intoggle.checked, outtoggle.checked);
    });
    outtoggle.addEventListener("click", function() {
        toggleView(intoggle.checked, outtoggle.checked);
    });
};

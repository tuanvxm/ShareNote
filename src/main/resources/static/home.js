let comp = {}

function loadComp() {
    comp = {
        header: {
            addNoteBtn: $(".btn-add-note")
        },
        side: {
            open: {
                self: $(".side-bar-open"),
                closeSideBtn: $(".close-side"),
                menuFilterInp: $(".menu-filter"),
                menu: {
                    notes: $(".menu-notes"),
                    about: $(".menu-about")
                }
            },
            close: {
                self: $(".side-bar-close"),
                openSideBtn: $(".open-side")
            }
        },
        main: {
            self: $(".main"),
            notes: {
                self: $(".main-notes"),
                listCont: $(".notes-list-cont")
            },
            about: {
                self: $(".main-about")
            }
        },
        modal: {
            self: $("#add-note-modal"),
            title: $("#note-title"),
            content: $("#note-content"),
            titleErr: $("#title-err"),
            contentErr: $("#content-err"),
            saveBtn: $(".btn-save-note")
        },
        viewNoteModal: {
            self: $("#view-note-modal"),
            id: $("#view-note-id"),
            title: $(".view-note-title"),
            time: $(".view-note-time"),
            content: $(".view-note-content")
        }
    }
}

function closeSide() {
    comp.side.open.self.addClass("no-show")
    comp.side.close.self.removeClass("no-show")
    comp.main.self.removeClass("side-open")
    comp.main.self.addClass("side-close")
}

function openSide() {
    comp.side.close.self.addClass("no-show")
    comp.side.open.self.removeClass("no-show")
    comp.main.self.removeClass("side-close")
    comp.main.self.addClass("side-open")
}

function filterMenu() {
    let val = comp.side.open.menuFilterInp.val()

    if ("notes".includes(val.toLowerCase())) {
        comp.side.open.menu.notes.removeClass("no-show")
    } else {
        comp.side.open.menu.notes.addClass("no-show")
    }

    if ("about us".includes(val.toLowerCase())) {
        comp.side.open.menu.about.removeClass("no-show")
    } else {
        comp.side.open.menu.about.addClass("no-show")
    }
}

function showNotes() {
    comp.main.about.self.addClass("no-show")
    comp.main.notes.self.removeClass("no-show")
    comp.side.open.menu.notes.addClass("active")
    comp.side.open.menu.about.removeClass("active")
}

function showAbout() {
    comp.main.notes.self.addClass("no-show")
    comp.main.about.self.removeClass("no-show")
    comp.side.open.menu.about.addClass("active")
    comp.side.open.menu.notes.removeClass("active")
}

function initEvents() {
    //Side bar
    comp.side.open.closeSideBtn.click(closeSide)
    comp.side.close.openSideBtn.click(openSide)
    comp.side.open.menuFilterInp.change(filterMenu)
    comp.side.open.menu.notes.click(showNotes)
    comp.side.open.menu.about.click(showAbout)
    //Modal
    comp.modal.saveBtn.click(saveNote)
}

function loadNotes() {
    $.get( "/note", function(notes) {
        if (notes.length === 0) {
            comp.main.notes.listCont.append('<div class="col-12">No note available, click <b> Add Note + </b> to add your first note!</div>')
        } else {
            notes.reverse().forEach(note => {
                comp.main.notes.listCont.append(`
                    <div class="col-xs-12 col-md-4 notes-item">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">#${note.id} - ${note.title}</h5>
                                <p class="card-text">${note.content}</p>
                                <a href="#" class="card-link" onclick="viewNote(${note.id})">View note</a>
                                <a href="#" class="card-link" onclick="deleteNote(${note.id})">Delete note</a>
                            </div>
                        </div>
                    </div>
                `)
            })
        }
    })
}

function viewNote(id) {
    $.get( "/note/" + id, function(note) {
        console.log(note)
        comp.viewNoteModal.id.text("Note #" + note.id)
        comp.viewNoteModal.title.text(note.title)
        comp.viewNoteModal.time.text(new Date(note.createdTime).toISOString().slice(0,10))
        comp.viewNoteModal.content.text(note.content)
        comp.viewNoteModal.self.modal("show")
    })
}

function deleteNote(id) {
    $.ajax({
        url: "/note/" + id,
        type: 'DELETE',
        success: function() {
            location.reload()
        }
    })
}

function saveNote() {
    let note = {
        title: comp.modal.title.val(),
        content: comp.modal.content.val(),
        status: 'new',
        createdTime: new Date().getTime()
    }

    let err = false

    if (!note.title) {
        comp.modal.titleErr.removeClass("no-show")
        err = true
    } else {
        comp.modal.titleErr.addClass("no-show")
    }

    if (!note.content)  {
        comp.modal.contentErr.removeClass("no-show")
        err = true
    } else {
        comp.modal.contentErr.addClass("no-show")
    }

    if (err) return

    jQuery.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'type': 'POST',
        'url': "/note",
        'data': JSON.stringify(note),
        'dataType': 'json',
        'success': (data) => {
            location.reload()
        }
    })
}

function init() {
    loadComp()
    initEvents()

    loadNotes()
}

init()
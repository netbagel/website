import { LandingPage } from "./class/level/landingpage"
import { Level } from "./class/core/level"
import { _game } from "."
import { AboutMe } from "./class/level/aboutme"
import { MySkills } from "./class/level/mywork"
import { FlappyBird } from "./class/level/flappybird"

var naventries: Array<HTMLElement> = []
var entries = document.getElementsByClassName("naventry")
var activatedEntries = document.getElementsByClassName("selectedentry")

const id_to_teleport = new Map<string, Level>([
    ["landing", new LandingPage()],
    ["aboutme", new AboutMe()],
    ["mywork", new MySkills()],
    ["flappybird", new FlappyBird()],
])

function buttonClick(element: HTMLElement) {
    if (element.className != "naventry" || _game.transition != -1) { return }
            
    for (var index2 = 0; index2 < activatedEntries.length; index2++) {
        let entry = <HTMLElement> activatedEntries.item(index2)
        entry.className = "naventry"
    }
    
    element.className = "selectedentry"

    var level = id_to_teleport.get(element.id)
    if (level == undefined) { return }
    
    _game.Teleport(level)
}

for (var index = 0; index < entries.length; index++) {
    let element: HTMLElement = <HTMLElement> entries.item(index)
    naventries.push(element)

    element.addEventListener("click", function() {
        buttonClick(element)
    })
}

var landing_page = id_to_teleport.get("landing")
if (landing_page != null) {
    _game.nextLevel = landing_page
}

var entry = entries.item(0)
if (entry != null) { 
    entry.className = "selectedentry"
}
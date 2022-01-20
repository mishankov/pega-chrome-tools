import { sleep } from "./utils";
import { addCopyRuleKeyIcons, addMiddleMouseTabClose } from "./dev-studio";
import { addDeselectPegaButton } from "./tracer-settings";
import { config, Config } from "../common";

async function getConfig() {
    let storageData = (await chrome.storage.local.get("config"));
    if (storageData === undefined) {
        return config
    } else {
        return (storageData.config as Config)
    }
}

async function mainContentLoop() {

    let config: Config = await getConfig();

    if (document.title.indexOf("Tracer Settings") != -1 && config.tracerSettingsRulesetSelectionEnabled) {
        addDeselectPegaButton();
    }

    while (true) {
        await sleep(1000);
        config = await getConfig();

        if (document.title.indexOf("Dev Studio") != -1) {
            if (config.copyRuleKeyEnabled) addCopyRuleKeyIcons();
            if (config.closeTabWithMiddleClickEnabled) addMiddleMouseTabClose();
        }
    }
}

console.log("Pega Chrome Tools is here!")

mainContentLoop();

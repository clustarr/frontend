export default class TaskApiHelper {
    static getTaskArgs = (task) => {
        let args = task.args;
        let argsList = [];
        for (let arg of args.slice(1, args.length-1).split(",")) {
            if (arg !== "") {
                argsList.push(arg);
            }
        }
        return argsList;
    }

    static getPlaybook = (task) => {
        let argsList = TaskApiHelper.getTaskArgs(task);
        let jsonStr = argsList[0].replaceAll('\'', '"');
        let json = JSON.parse(jsonStr);
        return json.playbook;
    }
}

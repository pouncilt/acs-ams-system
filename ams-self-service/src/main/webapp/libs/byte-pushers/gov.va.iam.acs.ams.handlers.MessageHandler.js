/**
 * Represents the application api.  If the variable is already defined use it,
 * otherwise create an empty object.
 *
 * @type {VA_AMS|*|VA_AMS|*|{}|{}}
 */
var VA_AMS = VA_AMS || {};
/**
 * Represents the application static variable. Use existing static variable, if one already exists,
 * otherwise create a new one.
 *
 * @static
 * @type {*|VA_AMS.handlers|*|VA_AMS.handlers|Object|*|Object|*}
 */
VA_AMS.handlers = VA_AMS.handlers || VA_AMS.namespace("gov.va.iam.acs.ams.handlers");
/**
 * Constructor method for the MessageHandler class.  The properties of this class can be initialized with
 * the jsonUserObject.
 * @class
 * @classdesc   This class is a handler class; which means it has the behaviour to know how to handle the Message.
 * @param {String}  jsonMessagesArrayObject  Represents the JSON representation of a Answer object.
 * @constructor
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.handlers.MessageHandler = function (jsonMessagesArrayObject) {
    var messages = (Object.isArray(jsonMessagesArrayObject) && jsonMessagesArrayObject.length > 0)? jsonMessagesArrayObject : [];

    function removeMessage(index){
        if(messages[index].numLives == 0){
            messages.splice(index, 1);
        }
        else{
            messages[index].numLives--;
        }
    }

    this.hasMessages = function() {
        return (messages.length > 0)? true: false;
    };

    this.hasErrorMessages = function() {
        return messages.some( function(message, index) {
            if(Object.isDefined(message)) {
                if (message.getType().toLowerCase() === "error") {
                    return true;
                }
            }
        });
    };

    this.hasSuccessfulMessages = function() {
        return messages.some( function(message, index) {
            if(message.getType().toLowerCase().includes(VA_AMS.models.Message.SUCCESSFUL)){
                return true;
            }
        });
    };

    this.clearMessages = function(type) {
        type = (Object.isDefined(type))? type : "all";

        messages.forEach( function(message, index) {
            if(type === "all"
                || message.getType().toLowerCase() === type){
                removeMessage(index);
            }
        });
    };

    /**
     * @param someMessage is the message object we are adding
     * @param addDuplicateMessages flag to allow duplicates
     * @param lives is an integer indicating how many times clearMessages() can be called
     * on the message without it being removed.  This is used for times when state transitions
     * happen and you want the message to stay around for the next state.
     */
    this.addMessage = function (someMessage, addDuplicateMessages, lives){
        addDuplicateMessages = (Object.isDefined(addDuplicateMessages))? addDuplicateMessages : false;
        someMessage.numLives = (Object.isDefined(lives) && parseInt(lives) == lives) ? lives : 0;

        if(addDuplicateMessages){//we don't care if there are dups
            messages.push(someMessage);
        }
        else{
            var foundDuplicatedMessage = messages.some(function (message) {
                if(message.getValue() === someMessage.getValue()) {
                    return true;
                }
            });

            if(!foundDuplicatedMessage) {
                messages.push(someMessage);
            }
        }
    };

    this.addSuccessfulMessage = function(msgValue) {
        if(Object.isString(msgValue)){
            var msg = new VA_AMS.models.Message({type: VA_AMS.models.Message.SUCCESSFUL, value: msgValue});
            this.addMessage(msg);
        }
    };

    this.addErrorMessage = function(msgValue) {
        if(Object.isString(msgValue)) {
            var msg = new VA_AMS.models.Message({type: VA_AMS.models.Message.ERROR, value: msgValue});
            this.addMessage(msg);
        }
    };

    this.addMessages = function (someMessages, addDuplicateMessages, lives){
        if(Object.isArray(someMessages)) {
            someMessages.forEach(function(message, index, array){
                this.addMessage(message, addDuplicateMessages, lives);
            }, this);
        }
    };

    this.getMessages = function(){
        return messages;
    };
};
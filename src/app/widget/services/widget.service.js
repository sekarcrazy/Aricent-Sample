(function () {
    angular.module('app.widget.service')
        .service('widgetService', ['$resource', 'appsettings', '$q', function ($resource, appsettings, $q) {
           var baseUrl = appsettings.nisApiBaseUrl + '/:controller/:dest'

           var self = this,nextId=0, defferedPromise, widgetList = [new Widget('Test1'), new Widget('Test2')];

           function Widget(name, value){
               this.name = name || ''; 
               this.value = value || 0;              
                Object.defineProperties(this, {
                    id: { enumerable: false, value: ++nextId, writable: false, configurable: false }
                });
           }
           Widget.prototype ={
               toString:function(){ return this.name;}
           };
           
           self.getNewWidgetItem = function(name, value) {
               return new Widget(name, value);
           } 
           self.getWidgetList = function()
           {
               defferedPromise = $q.defer();

               defferedPromise.resolve(widgetList);

               return defferedPromise.promise;
           }
           self.updateWidgetList = function(updatedWidgetItem, origninalWidgetItem)
           {
               if(!updatedWidgetItem) {
                   return;
               }
               var pos = widgetList.indexOf(origninalWidgetItem);
               if(pos > -1)
               {
                   widgetList[pos] = updatedWidgetItem;
               }else{
                   widgetList.push(updatedWidgetItem);
               }
           }
           self.removeWidget = function(id){
               //consider only one item
               var widgetItem = self.getWidgetById(id);
               if(widgetItem)
               {
                   widgetList.splice(widgetList.indexOf(widgetItem),1);
               }
           }
           self.getWidgetById = function(id){
               var removedItems = widgetList.filter(function(item)
               {
                   return item.id == id;
               });
               if(removedItems.length >0)
               {
                   return removedItems[0];
               }
           }

           self.isDirty = function(lookupWidget){
               if(!lookupWidget){
                   return false;
               }
               var duplicated = widgetList.filter(function(item)
               {
                   return lookupWidget.id != item.id && lookupWidget.name.toLowerCase() === item.name.toLowerCase();
               });
               return duplicated.length > 0 ? true : false;
           }

        }]);
})();
async function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

class ShipmentSearchIndex {
    async updateShipment(id: string, shipmentData: any) {
        const startTime = new Date()
        await randomDelay()
        const endTime = new Date()
        console.log(`update ${id}@${startTime.toISOString()} finished@${endTime.toISOString()}`
        )

        return { startTime, endTime }
    }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any)
}


//Now  implementing  Interface by declaring a class
class ShipmentUpdate  implements ShipmentUpdateListenerInterface{
    id : string;
    shipmentData : any;
    private tempProp:ShipmentSearchIndex = new ShipmentSearchIndex();
    
    constructor(id: string, shipmentData: any) { 
        this.id = id;
        this.shipmentData = shipmentData;
    }


    async receiveUpdate(id: string, shipmentData: any) 
    {
        //shipment update listener body
        let response = {
          "shipmentid" : id,
          "shipmentInformation" : shipmentData
        }
        console.log("Execution Order 1:");
        console.log("Shipment Update request body :",response);
        
        console.log("Execution Order 2:");
        //Then we are searching and updating our shipment
        const data = await this.tempProp.updateShipment(id,shipmentData);
        console.log("Shipment Updated :",data);

        
    }

}


/*---------------------------------------------------------------------------------------------------------- 

Just Assume => external system, REST interface, Queue system or something similar Response object structure
let data = {
    "id" : "some_string_as_id",
    "shipmentData" : {
        "shipmentname" : "Oil_Container",
        "valuePrice" : 50000
    }
}

let id = data.id;
let shipmentData = data.shipmentData;

-----------------------------------------------------------------------------------------------------------*/ 

var id = Math.random().toString(36).substring(7);
var shipmentData = {
    "shipmentname" : "Container_"+Math.random(),
    "valuePrice"   : Math.random()
}
 

//Passing parameters to my class
let obj =  new ShipmentUpdate(id,shipmentData);
obj.receiveUpdate(id,shipmentData);



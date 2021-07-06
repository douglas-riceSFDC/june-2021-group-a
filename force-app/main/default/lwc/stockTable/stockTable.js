import { LightningElement, api } from 'lwc';

export default class StockTable extends LightningElement {
    @api stock;

    selectStock(event){
        let selectedStock = this.stock.find(s => {
            return s.Name === event.currentTarget.text;
        });

        let stockClickedEvent = new CustomEvent('stockclicked', {detail: selectedStock.Id});
        this.dispatchEvent(stockClickedEvent);
    }
}
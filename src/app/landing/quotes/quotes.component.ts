import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  constructor(
    public knowledgeService: DataService,
    public loggerService: LoggerService
  ) { }

  quotes =[];
  allQuotes = [];
  isLoading = true;
  numQuotes = 3;
  ngOnInit(): void {
    this.knowledgeService.getQuotes().subscribe(
      (result:any) => {
        this.allQuotes = result;
        this.fetchQuotes(this.allQuotes);
        this.isLoading = false;
        // console.log(this.quotes)
      }
    )

    this.loggerService.logData('uf-quotes', this);
  }

  getNewQuotes(){
    this.fetchQuotes(this.allQuotes);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  fetchQuotes(quotes) {
    this.quotes = [];
    for (var i = 0; i < this.numQuotes; i++) {
      let len = this.allQuotes.length
      let selected_quote = quotes[this.getRndInteger(1, len)];
      // console.log(selected_quote);
      
      if(!selected_quote.author){
        selected_quote.author = "unknown";
      }
      this.quotes.push(selected_quote);
    }
  }
}

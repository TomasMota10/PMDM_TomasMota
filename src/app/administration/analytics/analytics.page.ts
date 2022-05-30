import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from "@angular/core";
import { RestService } from '../../services/rest.service';
import { Juego } from '../interfaces/interface';
import { Chart } from "chart.js";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {
  @ViewChild("lineCanvas") private lineCanvas: ElementRef;
  juegos: Juego[];
  barChart: any;
  categories: any;

  constructor(
    private restService: RestService) { }

  ngOnInit() {
    this.restService.getGames().then((juegos: Juego[]) => {
      this.juegos = juegos;
      this.generateChart();
      this.barChartMethod();
    });
  }

  generateChart(){

  }
  
  barChartMethod() {
    this.barChart = new Chart(this.lineCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.getCategories(),
        datasets: [
          {
            label: "Numero de juegos",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "cyan",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.getGamesbyCategory(),
            spanGaps: false,
          },
        ],
      },
    });
  }

  getGamesbyCategory(){
    var games = [];
    const categories = this.getCategories();
    for (let j = 0; j < categories.length; j++) {
      const category = categories[j];
      games.push(0);
    }
    for (let i = 0; i < this.juegos.length; i++) {
      const game = this.juegos[i];
      for (let j = 0; j < categories.length; j++) {
        const category = categories[j];
        if(game.genre === category){
          games[j]+=1;
        }
      }
    }
    return games;
  }

  getCategories(){
    var categories = [];
    for (let i = 0; i < this.juegos.length; i++) {
      const game = this.juegos[i];
        if( !categories.some(category => category === game.genre)){
          categories.push(game.genre);
        }
    }
    return categories;
  }

}

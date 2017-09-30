import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './components/questions/questions.component';

@NgModule({
	imports: [BrowserModule, HttpModule],
	declarations: [AppComponent, QuestionsComponent],
	bootstrap: [AppComponent]
})
export class AppModule{

}
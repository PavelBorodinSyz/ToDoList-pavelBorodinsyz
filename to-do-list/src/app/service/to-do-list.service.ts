import { Injectable } from "@angular/core";

export interface IToDo{
    id: number;
    text: string;
}

@Injectable()

export class ToDoListService {

    public TaskToDo: IToDo[] = [
        {id: 1, text: 'Покормить кота'},
        {id: 2, text: 'Поставить чайник'},
        {id: 3, text: 'Выключить чайник'},
        {id: 4, text: 'Налить чай'},
        {id: 5, text: 'Выпить чай'},
    ]
}

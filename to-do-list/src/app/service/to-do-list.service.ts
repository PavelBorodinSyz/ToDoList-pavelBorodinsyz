import { Injectable } from "@angular/core";

export interface IToDo{
    id: number;
    text: string;
    description: string;
}

@Injectable()

export class ToDoListService {

    public TaskToDo: IToDo[] = [
        {id: 1, text: 'Покормить кота', description: 'Он хочет кушать'},
        {id: 2, text: 'Поставить чайник', description: 'Надо вскипятить воду'},
        {id: 3, text: 'Выключить чайник', description: 'Чтобы дом не сгорел'},
        {id: 4, text: 'Налить чай', description: 'Крепкий, свежий чай'},
        {id: 5, text: 'Выпить чай', description: 'Насладиться вкусом'},
    ]
}

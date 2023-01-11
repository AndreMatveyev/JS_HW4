// Задача 1
// Задача - создать класс Student который принимает аргументом в конструкторе объект enrollee (абитурент). 
// У экземпляра класса Student должны быть поля: id - (генерируется при создании экземпляра и начинается с 1),
// name, surname, ratingPoint, schoolPoint - рейтинг студента по результатам ЗНО (все в объекте enrollee, массив в файле enrolleeArr.js);
// isSelfPayment - если true, то студент на контракте, если false - на бюджете (рассчитывается) 
class Student {
    constructor(enrollee) {
        this.id = Student.ID++;
        this.isSelfPayment = true;
        Object.assign(this, enrollee);
        
        Student.listOfStudents.push(this);
        Student.filterBySelfPaiment();
    }

    static ID = 1;

    static listOfStudents = [];

    static filterBySelfPaiment() {
        const studentsList = Student.listOfStudents;
                
        if (studentsList.length <= 5) {
            for (let i = 0; i < studentsList.length; i++) {
                studentsList[i].isSelfPayment = studentsList[i].ratingPoint < 800;
            }
        } else {
            
            studentsList.sort((a, b) => {
                if (a.ratingPoint === b.ratingPoint) {
                    return b.schoolPoint - a.schoolPoint;
                }
                return b.ratingPoint - a.ratingPoint;
            });

            for (let i = 0; i < studentsList.length; i++) {
                studentsList[i].isSelfPayment = i >= 5 || studentsList[i].ratingPoint < 800;
            }
            studentsList.sort((a, b) => a.id - b.id);
        }
    }
}

for (enrollee of enrolleeArr) {
    new Student(enrollee);
}

console.log(Student.listOfStudents);

// Задача 2
// Реализуйте класс CustomString, который будет иметь следующие методы: 
// метод reverse(), который параметром принимает строку, а возвращает ее в перевернутом виде, 
// метод ucFirst(), который параметром принимает строку, а возвращает эту же строку, сделав ее первую букву заглавной 
// и метод ucWords, который принимает строку и делает заглавной первую букву каждого слова этой строки.

class CustomString {
    constructor() {
    
    }

    reverse(string) {
        string = string.split('').reverse().join('');
        return string;
    }

    ucFirst(string) {
        let arr = string.split('');
        arr[0] = arr[0].toUpperCase();
        string = arr.join('');
        return string;
    }

    ucWords(string) {
        let arr = string.split(' ');
        for (let i = 0; i < arr.length; i++) {
            arr[i] = this.ucFirst(arr[i]);
        }
        string = arr.join(' ');
        return string;
    }
}

const myString = new CustomString();

console.log(myString.reverse('qwerty'));
console.log(myString.ucFirst('qwerty'));
console.log(myString.ucWords('qwerty qwerty qwerty'));

// Задача 3
// Реализуйте класс Validator, который будет проверять строки.У него будет метод 
// checkIsEmail() параметром принимает строку и проверяет, является ли она емейлом или нет. 
// Если является - возвращает true, если не является - то false. Кроме того, класс будет 
// иметь следующие методы:метод checkIsDomain для проверки домена, 
// метод checkIsDate для проверки даты и метод checkIsPhone для проверки телефона

class Validator {
    constructor() {
    
    }

    checkIsDomain(string) {
        return string.split('.').length > 1;
    }

    checkIsEmail(string) {
        const arr = string.split('@');
        return arr.length === 2 && this.checkIsDomain(arr[1]);
    }

    checkIsDate(string) {
        const arr = string.split('.');
        let flag = arr.length === 3 && arr[2].length ===  4;
        if ((arr[1] == 1 || 3 || 5 || 7 || 8 || 10 || 12) && arr[0] > 31) {
            flag = false;
        } 
        if ((arr[1] == 4 || 6 || 9 || 11) && arr[0] > 30) {
            flag = false;
        }
        if (arr[2] % 4 === 0) {
            if (arr[1] == 2 && arr[0] > 29) {
                flag = false;
            }
        } else {
            if (arr[1] == 2 && arr[0] > 28) {
                flag = false;
            }
        }
        return flag;  
    }

    checkIsPhone(string) {
        let arr = string.split(' ');
        arr[1] = arr[1].split('(').join('').split(')').join(''); // 
        arr[2] = arr[2].split('-').join('');
        let flag = (arr[0] === '+38' && arr[1].length === 3) || (arr[0] === '+380' && arr[1].length === 2);
        arr[0] = arr[0].split('+').join('');
        string = arr.join('');
        if (string.length !== 12 || isNaN(string)) {
            flag = false;
        }
        return flag;
    }
}

var validator = new Validator();

console.log(validator.checkIsDomain('google.com')); 
console.log(validator.checkIsEmail('vasya.pupkin@gmail.com')); 
console.log(validator.checkIsDate('30.11.2019')); 
console.log(validator.checkIsPhone('+380 (66) 932-99-92'));
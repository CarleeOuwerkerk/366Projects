function Set() {

	this.intersection = function(listA, listB) {
    
	   var resultList = [];

        //  If inputs are invalid, return null
        if (listA === null || listB === null){
            return null;
        }

        // For each in listA, look through listB to see if same value
        // If it is, add to resultList
        var i;
        var j;
        for (i = 0; i < listA.length; i++){
            var listAItem = listA[i];

            for (j = 0; j < listB.length; j++){
                var listBItem = listB[j];
                if (listBItem === listAItem){
                    resultList.push(listBItem);
                    break;
                }
            }
        }
	   return resultList;
	}

    
	this.union = function(listA, listB) {

        var resultList = [];

        //  If inputs are invalid, return null
        if (listA === null || listB === null){
            return null;
        }

        // For each in listA, look through listB to see if same value
        // If it is, do not add to resultList
        var i;
        for (i = 0; i < listA.length; i++){
            if (!this.contains(listB, listA[i])){
                resultList.push(listA[i]);
            }
        }

        // For each in listB, look through listA to see if same value
        // If it is, do not add to resultList
        var i;
        for (i = 0; i < listB.length; i++){
            if (!this.contains(listA, listB[i])){
                resultList.push(listB[i]);
            }
        }

        // For each in listA, look through listB to see if same value
        // If it is, add to resultList
        var i;
        var j;
        for (i = 0; i < listA.length; i++){
            var listAItem = listA[i];

            for (j = 0; j < listB.length; j++){
                var listBItem = listB[j];
                if (listBItem === listAItem){
                    resultList.push(listBItem);
                    break;
                }
            }
        }
	   return resultList;
	}


	this.relativeComplement = function(listA, listB) {

	   var resultList = [];

        //  If inputs are invalid, return null
        if (listA === null || listB === null){
            return null;
        }

        // For each in listA, look through listB to see if same value
        // If it is, do not add to resultList
        var i;
        for (i = 0; i < listA.length; i++){
            if (!this.contains(listB, listA[i])){
                resultList.push(listA[i]);
            }
        }
	   return resultList;
	}


    this.symmetricDifference = function(listA, listB) {

        var resultList = [];

        //  If inputs are invalid, return null
        if (listA === null || listB === null){
            return null;
        }

        // For each in listA, look through listB to see if same value
        // If it is, do not add to resultList
        var i;
        for (i = 0; i < listA.length; i++){
            if (!this.contains(listB, listA[i])){
                resultList.push(listA[i]);
            }
        }

        // For each in listB, look through listA to see if same value
        // If it is, do not add to resultList
        var i;
        for (i = 0; i < listB.length; i++){
            if (!this.contains(listA, listB[i])){
                resultList.push(listB[i]);
            }
        }

        return resultList;
    }

    this.contains = function(list, value) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] === value)
                return true;
        }
        return false;
    }
	

}

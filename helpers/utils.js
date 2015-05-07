/*
A small helper library for working with entries
*/

var utils = {
	filterEntries: function(entries, modifierName, term, done) {
		//we want to filter by the modifier name
      var filteredEntries = [];
      // loop through all the entries
      entries.map(function(entry){
        //then loop through all of the modifiers of that entry
        entry.modifiers.map(function(modifier){
          if (modifier.name == modifierName) {
            if (_.contains(modifier.terms, term)) {
              filteredEntries.push(entry);
            }
          }
        });
      });
      done(filteredEntries);
	}
}

module.exports = utils;
#!/usr/bin/env python


import csv

def makeString():
#going to put them all in this big one
	fullStr = "{ \"pokemon\": \n[%s] }"

#the outer thing


	with open('types', 'rb') as csvfile:
		readin = csv.reader(csvfile)
		data = {}
		for row in readin:
			if(not data.has_key(row[0])):
				#print row[0],"has type1",row[1]
				data[row[0]] = {} #init
				data[row[0]]["num"] = row[0] #number
				data[row[0]]["type1"] = row[1] #type1
			else:
				#print row[0],"has type2",row[1]
				data[row[0]]["type2"] = row[1] #type2

	#print data['1']

	with open('stats', 'rb') as csvfile:
		readin = csv.reader(csvfile)
		for row in readin:
			data[row[0]][row[1]] = int(row[2])

	with open('names', 'rb') as csvfile:
		readin = csv.reader(csvfile)
		for row in readin:
			data[row[0]]['name'] = row[1]

	bigstr = ''

	for i in range(1, 650):
		bigstr += str(data[str(i)])
		if(not i == 649):
			bigstr += ","
			bigstr += '\n'


	endstr = fullStr % bigstr
	
	print endstr


	print data['673']

	F = open("pkmn.json", "w")
	F.write(endstr)


def main():
	makeString()




if __name__ == '__main__':
    main()

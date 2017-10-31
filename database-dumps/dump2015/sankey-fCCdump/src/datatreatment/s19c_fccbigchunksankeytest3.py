import os, sys
import gc
import csv
import json
import re
import random
from collections import defaultdict
#http://www.saltycrane.com/blog/2008/11/python-datetime-time-conversions/
#https://docs.python.org/3.4/library/datetime.html
#check timestamp
from datetime import datetime, date, timedelta


directory = "/your/data_analysis/1_archive" #<================== PLEASE substitute this code for something that suits you


data1nodes = set()
data1links = dict()
datred = defaultdict(int)
#data1nodes.add("init")
counter = 0
with open(directory+"/output.json", "r") as f_in:
    while 1:
        record = f_in.readline()
        if not record: break
        if len(record) > 3:
            try:
                recordjson = json.loads(record[:-2])
                rec = sorted([(rec["completedDate"],rec["name"]) for rec in recordjson if "name" in list(rec.keys()) and "completedDate" in list(rec.keys())])
                if rec == []:
                    continue
                #check that start in FCC within the period
                startdate = datetime.date(datetime.fromtimestamp(int(rec[0][0])/1000))
                #if startdate >= date(2015,2,1) and startdate <= date(2015,4,22):
                if startdate >= date(2015,2,1) and startdate <= date(2015,3,31):
                    #assuming that further updates of an exercise are not valid in the learning progression
                    #therefore: considering them as duplicates to be removed
                    tempdup = set()
                    #print(rec)
                    recrange = rec[:]
                    for elem in recrange:
                        if elem[1] in tempdup:
                            rec.remove(elem)    
                        tempdup.add(elem[1])
                    #print(len(rec), len(tempdup))
                    counter += 1
                    #if counter > 50: break
                    #here the new rec with only valid entries is considered
                    for i in range(0, len(rec)):
                        compdate = datetime.date(datetime.fromtimestamp(int(rec[i][0])/1000))
                        #if compdate >= date(2015,2,1) and compdate <= date(2015,4,22):
                        if compdate >= date(2015,2,1) and compdate <= date(2015,3,31):
                            #exception initial step
                            #http://www.python-course.eu/lambda.php
                            #tuples of steps: for each, first step position and then full name challenge
                            if i == 0:
                                datred[("_0init", str(i)+"_"+str(rec[i][1]))] = datred[("_0init", str(i)+"_"+str(rec[i][1]))] + 1    
                                print(rec[i][1])
                                data1nodes.add(str(rec[i][1]))
                            else:
                                datred[(str(i-1)+"_"+str(rec[i-1][1]), str(i)+"_"+str(rec[i][1]))] = datred[(str(i-1)+"_"+str(rec[i-1][1]), str(i)+"_"+str(rec[i][1]))] + 1
                                data1nodes.add(str(rec[i][1]))
            except ValueError:
                if record == '': continue

#"".join(map(lambda x: x[0], a.split(" ")))
#sys.exit(0)
#building the json file; re-indexing the challenges
#nodes re-indexed
#reindexednodes = defaultdict(str)
# for i,v in enumerate(list(data1nodes)):
#     reindexednodes[v] = str(i+1)

reindexednodes = defaultdict(str)
for v in list(data1nodes):
    reindexednodes[v] = "".join(map(lambda x:x[0],v.split(" "))) #using map to just take the initials of any challenge
    
#jsonfile data and jsonfile
links = []
nodesset = set()
with open(directory+"/linksmod.csv", "w", newline="") as f_out:
    f_outcsv = csv.writer(f_out, delimiter=",")
    for k in datred:
        k1 = k[0].split('_')
        k2 = k[1].split('_')
        links.append({"source":k1[0]+"_"+reindexednodes[k1[1]], "target": k2[0]+"_"+reindexednodes[k2[1]], "value": datred[k]})
        nodesset.add(k1[0]+"_"+reindexednodes[k1[1]])
        nodesset.add(k2[0]+"_"+reindexednodes[k2[1]])
        f_outcsv.writerow([k1[0]+"_"+reindexednodes[k1[1]], k2[0]+"_"+reindexednodes[k2[1]], datred[k]])

nodes = []
with open(directory+"/nodesmod.csv", "w", newline="") as f_out:
    f_outcsv = csv.writer(f_out, delimiter=",")
    for nod in nodesset:
        nodes.append({"name":nod})
        f_outcsv.writerow([nod])
    
finaldata = {"links":links, "nodes":nodes}

with open(directory+'/sankeyrevisedmod.json','w') as json_out:
    json.dump(finaldata, json_out)

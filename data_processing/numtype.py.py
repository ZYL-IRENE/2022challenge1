#!/usr/bin/env python
# coding: utf-8
# This script is used to calculate the number of each type of node.
# 'getdata()' is used to read the node information in the sub-graph
# 'gettypenum()' is used to calculate the number of each type of node

import csv

def getdata(filename):
    data=[]
    with open(filename) as f:
        f_csv = csv.reader(f)
        headers=next(f_csv)
        for row in f_csv:
            data.append(row)
    return data


def gettypenum(data):
    num_Domain=0
    num_IP=0
    num_Cert=0
    num_Whois_Name=0
    num_Whois_Phone=0
    num_Whois_Email=0
    num_IP_C=0
    num_ASN=0
    
    for line in data:
        if line[2]=='Domain':
            num_Domain+=1
        elif line[2]=='IP':
            num_IP+=1
        elif line[2]=='Cert':
            num_Cert+=1
        elif line[2]=='Whois_Name':
            num_Whois_Name+=1
        elif line[2]=='Whois_Phone':
            num_Whois_Phone+=1
        elif line[2]=='Whois_Email':
            num_Whois_Email+=1
        elif line[2]=='IP_C':
            num_IP_C+=1
        elif line[2]=='ASN':
            num_ASN+=1
    
    return [num_Domain,num_IP,num_Cert,num_Whois_Name,num_Whois_Phone,num_Whois_Email,num_IP_C,num_ASN]







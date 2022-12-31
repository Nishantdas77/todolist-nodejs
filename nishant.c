#include<stdio.h>
#include<math.h>
void main(){
 int n;
 int i,sqr,digit,dup,x=10;
 scanf("%d",&n);
 dup=n;
 while (n!=0)
{
    n=n/10;
    i++;
}
sqr=n*n;

digit=sqr % (int)pow(10,i) ;
if(digit==n)
printf("yes");
else 
printf("no"); 
}
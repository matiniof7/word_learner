from django.shortcuts import render
from .models import Eng_w
import random
from django.contrib import messages

# Create your views here.
def index(request):
    return render(request, 'eng_w/index.html')

def sessions(request):
    fn = request.POST.get("session_number", '1')
    current_word_index = int(request.POST.get("current_word_index", 0))

    if not fn.isdigit():
        n = 1
    else:
        n = int(fn)

    action = request.POST.get("action")
    if action == "next":
        n += 1
    elif action == "prev":
        n -= 1
    elif action == "prev_word":
        current_word_index-=1
    elif action == "next_word":
        current_word_index+=1
    
    if current_word_index<0:
        current_word_index=4
    elif current_word_index>4:
        current_word_index=0

    if n < 1:
        n = 1
    elif n > 60:
        n = 60

    start = (n - 1) * 5
    end = n * 5 
    words = Eng_w.objects.all()[start:end]

    # تبدیل به لیست دیکشنری برای template
    words_data = [{"w": word.w, "t": word.t} for word in words]

    #send the word step by step to show

    current_word=words_data[current_word_index]

    return render(request, "eng_w/eng_sessions.html", {
        "session_number": n,
        "words_data": current_word  ,
        "current_word_index":current_word_index
    })



def exam(request):

    str_numbers = [str(i) for i in range(1, 61)]

    start = request.POST.get("start-lesson", 1)
    end = request.POST.get("end-lesson", 1)
    count = request.POST.get("words-count", 5)

    if start not in str_numbers:
        messages.error(request, "Start lesson must be between 1 and 60!")
        return render(request, 'eng_w/eng_exam.html', {
            "start_lesson": start,
            "end_lesson": end,
            "words_count": count
        })
    start = int(request.POST.get("start-lesson", 1))
    
    if end not in str_numbers:
        messages.error(request, "End lesson must be between 1 and 60!")
        return render(request, 'eng_w/eng_exam.html', {
            "start_lesson": start,
            "end_lesson": end,
            "words_count": count
            })
    
    end = int(request.POST.get("end-lesson", 1))

    if start>end:
        messages.error(request, "Exam till lesson should be bigger than star lesson!")
        return render(request, 'eng_w/eng_exam.html')



    if not count.isdigit():
        
        messages.error(request, "please compleate the fields")

        return render(request, 'eng_w/eng_exam.html')
    
    count = int(request.POST.get("words-count", 5))

    if  count >(end-start)*5:
        messages.error(request, "we donn't have this number of word in this priod of lessons")

        return render(request, 'eng_w/eng_exam.html',{
            "start_lesson": start,
            "end_lesson": end,
            "words_count": count
        })
    

   
    
    

    
    finall_list=[]
    action = request.POST.get("action")
    if action =="Create":
        s=(start-1)*5
        e=end*5

        words=Eng_w.objects.all()[s:e]
        
    for _ in range(count):
        x = random.choice(words)
    # بررسی تکراری بودن کلمه
        while any(item['w'] == x.w for item in finall_list):
            x = random.choice(words)
    
        finall_list.append({
            "w": x.w,
            "t": x.t
        })

    



    return render(request, 'eng_w/eng_exam.html', {
    "finall_list": finall_list,
    "start_lesson": request.POST.get("start-lesson", ""),
    "end_lesson": request.POST.get("end-lesson", ""),
    "words_count": request.POST.get("words-count", "")
})

def detect_candidate_type(resume_text):

    text = resume_text.lower()

    experienced_keywords = [
        "work experience",
        "professional experience",
        "years of experience",
        "employment history",
        "worked at",
        "company"
    ]

    fresher_keywords = [
        "student",
        "b.tech",
        "bachelor",
        "internship",
        "academic project",
        "final year"
    ]

    exp_score = 0
    fresher_score = 0


    for keyword in experienced_keywords:
        if keyword in text:
            exp_score += 1


    for keyword in fresher_keywords:
        if keyword in text:
            fresher_score += 1


    if exp_score > fresher_score:
        return "Experienced"

    return "Fresher"
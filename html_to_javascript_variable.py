"""
Purpose of this script is to convert content html pages into javascript variables in content.js file, this is a hack to overcome propblems with Jquery's load function.
"""
#!/usr/bin/python

content_files = ["me.html", "projects.html", "resume.html", "contact.html", "server.html"]
content_javascript = "js/content.js"

def writeline():
    pass



def main():
    js_content = open(content_javascript,'w')
    for content_file in content_files:
        var_name = content_file.split('.')[0]
        f = open(content_file)
        js_content.write("var "+var_name+" = ")
        for line in f:
            line = line.strip()
            if len(line) != 1:
                js_content.write("\""+line+"\" + \n")
    js_content.close()

if __name__ == "__main__":
    main()

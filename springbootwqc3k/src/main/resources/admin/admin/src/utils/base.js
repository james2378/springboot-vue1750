const base = {
    get() {
        return {
            url : "http://localhost:8080/springbootwqc3k/",
            name: "springbootwqc3k",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springbootwqc3k/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于spring框架的电影订票系统"
        } 
    }
}
export default base

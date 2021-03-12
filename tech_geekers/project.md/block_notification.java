package com.example.onlineexam;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

public class block_notification extends AppCompatActivity {

    Button btnr;
    WebView wvv;

    String ss = "https://www.youtube.com/watch?v=DBQIlBcL99A";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_block_notification);

        btnr = findViewById(R.id.btnr);

        wvv = findViewById(R.id.wvv);

        wvv.setWebViewClient(new WebViewClient());
        wvv.getSettings().setJavaScriptEnabled(true);

        btnr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==btnr) {
                    wvv.loadUrl(ss);
                }
            }
        });


    }
}